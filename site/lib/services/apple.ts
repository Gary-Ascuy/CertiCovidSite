import { ApplePass, BarcodeDescriptor } from "@walletpass/pass-js/dist/interfaces"
import { v4 as uuid } from 'uuid'

import { ResponsePayload } from "../models/ResponsePayload"
import { VaccinationInformation } from "../models/VaccinationInformation"

const format = 'PKBarcodeFormatQR'
const messageEncoding = 'iso-8859-1'

export function buildApplePass(urlBase64: string, response: ResponsePayload<VaccinationInformation>): Partial<ApplePass> {
  const vaccine = response.data

  // QR Code
  const url = Buffer.from(urlBase64, 'base64').toString()
  const barcode = { format, message: url, messageEncoding, altText: 'CertiCovid' } as BarcodeDescriptor

  // Primary Fields
  const name = { key: 'name', label: 'NOMBRE', value: vaccine.name }

  // Secondary Fields
  const supplier = { key: 'supplier', label: 'PROVEEDOR', value: vaccine.supplier }
  const dose = { key: 'dose', label: 'DOSIS', value: vaccine.dose }
  const vaccinationDate = { key: 'vaccinationDate', label: 'FECHA', value: vaccine.vaccinationDate }

  // Back Fields
  const personal = { key: 'personal', label: 'Información Personal', value: `Nombre completo:\n${vaccine.name}\nDocumento de Identidad:\n${vaccine.ci}\nFecha nacimiento:\n${vaccine.birthday}` }
  const place = { key: 'place', label: 'Lugar de Vacunación', value: `Departamento:\n${vaccine.departament}\nMunicipio:\n${vaccine.municipality}\nEstablecimiento:\n${vaccine.establishment}` }
  const vaccineDetails = { key: 'vaccine', label: 'Información de la Vacuna', value: `Fecha vacunacion:\n${vaccine.vaccinationDate}\nVacuna:\n${vaccine.vaccine}\nDosis:\n${vaccine.dose}\nProveedor:\n${vaccine.supplier}\nLote:\n${vaccine.lot}\nNro. consentimiento:\n${vaccine.consentNumber}\nFecha proxima vacunacion:\n${vaccine.nextVaccinationDate}` }
  const createdAt = { key: 'createdAt', label: 'Fecha de Generación', value: new Date().toUTCString() }

  const terms = { key: 'TERMS', label: 'Terminos del servicio', value: 'Tenga en cuenta que no somos los emisores de los certificados originales y no estamos conectados de ninguna manera con las autoridades oficiales del País ni los representamos de ninguna manera. Estamos transfiriendo el mismo código QR de validación de su certificado original en papel/PDF al formato digital, y la funcionalidad se ha probado con todas las aplicaciones de validación disponibles en el momento del desarrollo.\n\nCertiCovid no reemplaza el Certificado emitido por el País, solo lo digitaliza. Le recomendamos encarecidamente que tenga a mano su certificado original y busque activamente la información y las medidas más recientes del uso del certificado en su país.' }
  const team = { key: 'TEAM', label: 'Equipo', value: '- Gary Ascuy @garyascuy\n- Rodrigo Ergueta @rodrigoergueta\n- Ramiro Ergueta @ramiroergueta' }

  const generic = {
    primaryFields: [name],
    secondaryFields: [supplier, dose, vaccinationDate],
    backFields: [personal, place, vaccineDetails, createdAt, terms, team],
  }

  // Base Fields
  const baseFields = {
    serialNumber: uuid(),
    description: 'Carnet de Vacunación',
    logoText: 'Carnet de Vacunación',
  }

  return { ...baseFields, barcodes: [barcode], generic }
}
