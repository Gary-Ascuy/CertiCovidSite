import _ from "lodash"

export const MinBoliviaUrlRegExp = /^https\:\/\/sus\.minsalud\.gob\.bo/gi
export const CovidDataRegExp = /\-COVID\-19\-/gi
export const basePath = 'https://sus.minsalud.gob.bo/busca_vacuna_dosisqr'
export const errorMessage = 'El QR que intenta escanear no corresponde al de la Vacuna'

export interface ValidationResult {
  url: string
}

export function validateQrData(url: string): ValidationResult {
  const data = url.trim()
  if (MinBoliviaUrlRegExp.test(data)) return { url }

  return validateOldQRCodeValue(data)
}

export function validateOldQRCodeValue(data: string): ValidationResult {
  const [info, vaccine] = data.split(CovidDataRegExp)
  if (!info || !vaccine) throw new Error(errorMessage)

  const [name, ci, y, m, d] = info.split('-')
  const [dose, place, lot] = vaccine.split('-')
  if (!_.isDate(new Date(`${y}-${m}-${d}`))) throw new Error(errorMessage)

  const error: any = new Error(`El QR corresponde a ${name}, pero tiene un formato antiguo, por favor utilice un certificado actual.`)
  error.details = { name, ci, date: `${d}/${m}/${y}`, dose, place, lot }
  throw error
}
