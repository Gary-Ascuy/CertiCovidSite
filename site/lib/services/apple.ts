import { ApplePass, BarcodeDescriptor } from "@walletpass/pass-js/dist/interfaces"
import { PersonalData } from "./crawler"

const format = 'PKBarcodeFormatQR'
const messageEncoding = 'iso-8859-1'

export function buildApplePass(urlBase64: string, personalData: PersonalData): Partial<ApplePass> {
  const url = Buffer.from(urlBase64, 'base64').toString()
  const barcode = { format, message: url, messageEncoding, altText: url } as BarcodeDescriptor
  const name = { key: 'primary', label: 'Name', value: personalData.data['NOMBRE COMPLETO'] }

  return { barcodes: [barcode], generic: { primaryFields: [name] } }
}
