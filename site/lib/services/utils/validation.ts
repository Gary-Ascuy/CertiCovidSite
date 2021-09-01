import { isDate } from 'lodash'

export const CovidDataRegExp = /\-COVID\-19\-/gi
export const errorMessage = 'El QR que intenta escanear no corresponde al de la Vacuna'

export function getValidationError(url: string) {
  const regexp = /^https\:\/\/sus\.minsalud\.gob\.bo/gi
  if (regexp.test(url)) return null
  return isOldQRCode(url)
}

export function isOldQRCode(data: string) {
  const [info, vaccine] = data.split(CovidDataRegExp)
  if (!info || !vaccine) return errorMessage

  const [name, _ci, y, m, d] = info.split('-')
  const [_dose, _place, _lot] = vaccine.split('-')
  if (!isDate(new Date(`${y}-${m}-${d}`))) return errorMessage

  return `El QR corresponde a ${name}, pero tiene un formato antiguo. Por favor utilice un certificado con un QR Actualizado. Para generar un certificado con un QR actual diríjase a <a target="_blank" class="hover:underline text-primary font-light" href="https://sus.minsalud.gob.bo/#vacuna" rel="noreferrer">https://sus.minsalud.gob.bo/#vacuna</a>`
}
