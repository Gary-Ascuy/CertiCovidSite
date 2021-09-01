import { isDate } from 'lodash'

export const CovidDataRegExp = /\-COVID\-19\-/gi
export const errorMessage = 'El QR que intenta escanear no corresponde al de la Vacuna'

export interface ValidationResult {
  url: string
  error?: string
}

// FIX: Some URLs had wrong data format
// Wrong: https://sus.minsalud.gob.bo/busca_vacuna_dosisqr?dosis=2da%20DOSIS&ci=6667778&fechanacimiento=1999-06-25
// Correct: https://sus.minsalud.gob.bo/busca_vacuna_dosisqr?dosis=2da%20DOSIS&ci=6667778&fechanacimiento=25/06/1999
export function fixUrl(url: string) {
  try {
    const query = new URL(url).search
    const [_, date] = query.split(/fechanacimiento\=/)

    const isWrongDate = /^\d{4}\-\d{2}\-\d{2}$/
    if (isWrongDate.test(date)) {
      const [y, m, d] = date.split('-')
      return url.replace(date, `${d}/${m}/${y}`)
    }
  } catch (error) {
  }

  return url
}

export function getValidationError(url: string): ValidationResult {
  const regexp = /^https\:\/\/sus\.minsalud\.gob\.bo/gi
  if (regexp.test(url)) return { url: fixUrl(url) }
  return isOldQRCode(url)
}

export function isOldQRCode(data: string): ValidationResult {
  const [info, vaccine] = data.split(CovidDataRegExp)
  if (!info || !vaccine) return { url: data, error: errorMessage }

  const [name, _ci, y, m, d] = info.split('-')
  const [_dose, _place, _lot] = vaccine.split('-')
  if (!isDate(new Date(`${y}-${m}-${d}`))) return { url: data, error: errorMessage }

  return {
    url: data,
    error: `El QR corresponde a ${name}, pero tiene un formato antiguo. Por favor utilice un certificado con un QR Actualizado. Para generar un certificado con un QR actual diríjase a <a target="_blank" class="hover:underline text-primary font-light" href="https://sus.minsalud.gob.bo/#vacuna" rel="noreferrer">https://sus.minsalud.gob.bo/#vacuna</a>`
  }
}
