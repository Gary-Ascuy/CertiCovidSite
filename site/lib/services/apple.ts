import { ApplePass, BarcodeDescriptor } from "@walletpass/pass-js/dist/interfaces"
import { v4 as uuid } from 'uuid'

import { ResponsePayload } from "../models/ResponsePayload"
import { VaccinationInformation } from "../models/VaccinationInformation"

const format = 'PKBarcodeFormatQR'
const messageEncoding = 'utf-8'

export function buildApplePass(urlBase64: string, response: ResponsePayload<VaccinationInformation>): Partial<ApplePass> {
  const vaccine = response.data

  // QR Code
  const url = Buffer.from(urlBase64, 'base64').toString()
  const barcode = { format, message: url, messageEncoding, altText: 'CertiCovid' } as BarcodeDescriptor

  // Primary Fields
  const name = { key: 'NAME', label: 'NOMBRE', value: vaccine.name }

  // Secondary Fields
  const supplier = { key: 'SUPPLIER', label: 'PROVEEDOR', value: vaccine.supplier }
  const dose = { key: 'DOSE', label: 'DOSIS', value: vaccine.dose }
  const vaccinationDate = { key: 'VACCINATIONDATE', label: 'FECHA', value: vaccine.vaccinationDate }

  // Back Fields
  const poweredBy = { key: 'POWEREDBY', label: 'Powered By CertiCovid', value: 'https://bo.certicovid.me' }

  const personal = { key: 'PERSONAL', label: 'Información Personal', value: `Nombre completo:\n${vaccine.name}\nDocumento de Identidad:\n${vaccine.ci}\nFecha nacimiento:\n${vaccine.birthday}` }
  const place = { key: 'PLACE', label: 'Lugar de Vacunación', value: `Departamento:\n${vaccine.departament}\nMunicipio:\n${vaccine.municipality}\nEstablecimiento:\n${vaccine.establishment}` }
  const vaccineDetails = { key: 'VACCINEDETAILS', label: 'Información de la Vacuna', value: `Fecha de Vacunación:\n${vaccine.vaccinationDate}\nVacuna:\n${vaccine.vaccine}\nDosis:\n${vaccine.dose}\nProveedor:\n${vaccine.supplier}\nLote:\n${vaccine.lot}\nNro. consentimiento:\n${vaccine.consentNumber}\nFecha próxima vacunación:\n${vaccine.nextVaccinationDate}` }
  const createdAt = { key: 'CREATEDAT', label: 'Fecha de Generación', value: new Date().toUTCString() }

  const terms = { key: 'TERMSANDCONDITIONS', label: 'Términos y Condiciones', value: 'Tenga en cuenta que no somos los emisores de los certificados originales y no estamos conectados de ninguna manera con las autoridades oficiales del Gobierno ni los representamos de ninguna manera. Estamos transfiriendo toda la información que figura y contiene el Carnet de Vacunación COVID-19 emitido por el Ministerio de Salud y Deportes del Estado Plurinacional de Bolivia y el mismo código QR de validación de su certificado original en papel/PDF al formato digital, y la funcionalidad se ha probado con todas las aplicaciones de validación disponibles en el momento del desarrollo.  Se aclara que el uso de la imagen de Gobierno y el Imagotipo en la aplicación, se atribuye al uso original por parte del Ministerio de Salud y Deportes del Estado Plurinacional de Bolivia al transferirse toda la información y contenido del Carnet de Vacunación COVID-19, emitido por ese Ministerio.\n\nCertiCovid no reemplaza el Certificado emitido por el Ministerio de Salud, solo lo digitaliza. Le recomendamos encarecidamente que tenga a mano su certificado original y busque activamente la información y las medidas más recientes del uso del certificado en el Pais.' }
  const team = { key: 'TEAM', label: 'Equipo de Desarrollo', value: '- Gary Ascuy @garyascuy\n- Rodrigo Ergueta @rodrigoergueta\n- Ramiro Ergueta @ramiroergueta' }

  const generic = {
    primaryFields: [name],
    secondaryFields: [supplier, dose, vaccinationDate],
    backFields: [poweredBy, personal, place, vaccineDetails, createdAt, terms, team],
  }

  // Base Fields
  const baseFields = {
    serialNumber: uuid(),
    description: 'Carnet de Vacunación',
    logoText: 'Carnet de Vacunación',
  }

  return { ...baseFields, barcodes: [barcode], generic }
}
