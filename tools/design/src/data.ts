import { ApplePass } from '@walletpass/pass-js/dist/interfaces'
import { v4 as uuid } from 'uuid'

export const description = 'Carnet de Vacunación'
export const passTypeIdentifier = process.env.COVID__PASS_TYPE_IDENTIFIER
export const teamIdentifier = process.env.COVID__TEAM_IDENTIFIER

const { success, data, url } = {
  success: true,
  data: {
    name: 'MANUEL GUIOMAR HANNE GARRY',
    ci: '7675764',
    birthday: '01/07/1782',
    departament: 'COCHABAMBA',
    municipality: 'COCHABAMBA',
    establishment: 'VACUNATORIO FACULTAD DE MEDICINA',
    vaccine: 'COVID-19',
    vaccinationDate: '06/05/2021',
    dose: '2da DOSIS',
    supplier: 'SPUTNIK-V',
    lot: 'II-676821',
    consentNumber: '4549653',
    nextVaccinationDate: '06/08/2021'
  },
  url: 'https://sus.minsalud.gob.bo/busca_vacuna_dosisqr?dosis=2da%20DOSIS&ci=7675764&fechanacimiento=01/07/1782'
}

export const value: Partial<ApplePass> = {
  passTypeIdentifier,
  teamIdentifier,
  organizationName: 'CertiCovid',
  serialNumber: uuid(),
  description: description,
  logoText: description,
  generic: {
    backFields: [
      {
        key: 'POWEREDBY',
        label: 'Powered By CertiCovid',
        value: 'https://bo.certicovid.me'
      },
      {
        key: 'PERSONAL',
        label: 'Información Personal',
        value: `Nombre completo:\n${data.name}\nDocumento de Identidad:\n${data.ci}\nFecha nacimiento:\n${data.birthday}`
      },
      {
        key: 'PLACE',
        label: 'Lugar de Vacunación',
        value: `Departamento:\n${data.departament}\nMunicipio:\n${data.municipality}\nEstablecimiento:\n${data.establishment}`
      },
      {
        key: 'VACCINEDETAILS',
        label: 'Información de la Vacuna',
        value: `Fecha de Vacunación:\n${data}\nVacuna:\n${data.vaccine}\nDosis:\n${data.dose}\nProveedor:\n${data.supplier}\nLote:\n${data.lot}\nNro. consentimiento:\n${data.consentNumber}\nFecha próxima vacunación:\n${data.nextVaccinationDate}`
      },
      {
        key: 'CREATEDAT',
        label: 'Fecha de Generación',
        value: new Date().toUTCString()
      },
      {
        key: 'TERMSANDCONDITIONS',
        label: 'Términos y Condiciones',
        value: 'Tenga en cuenta que no somos los emisores de los certificados originales y no estamos conectados de ninguna manera con las autoridades oficiales del Gobierno ni los representamos de ninguna manera. Estamos transfiriendo toda la información que figura y contiene el Carnet de Vacunación COVID-19 emitido por el Ministerio de Salud y Deportes del Estado Plurinacional de Bolivia y el mismo código QR de validación de su certificado original en papel/PDF al formato digital, y la funcionalidad se ha probado con todas las aplicaciones de validación disponibles en el momento del desarrollo.  Se aclara que el uso de la imagen de Gobierno y el Imagotipo en la aplicación, se atribuye al uso original por parte del Ministerio de Salud y Deportes del Estado Plurinacional de Bolivia al transferirse toda la información y contenido del Carnet de Vacunación COVID-19, emitido por ese Ministerio.\n\nCertiCovid no reemplaza el Certificado emitido por el Ministerio de Salud, solo lo digitaliza. Le recomendamos encarecidamente que tenga a mano su certificado original y busque activamente la información y las medidas más recientes del uso del certificado en el Pais.'
      },
      {
        key: 'TEAM',
        label: 'Equipo de Desarrollo',
        value: '- Gary Ascuy @garyascuy\n- Rodrigo Ergueta @rodrigoergueta\n- Ramiro Ergueta @ramiroergueta'
      }
    ],
    primaryFields: [
      {
        key: 'NAME',
        label: 'NOMBRE',
        value: data.name
      }
    ],
    secondaryFields: [
      {
        key: 'SUPPLIER',
        label: 'PROVEEDOR',
        value: data.supplier
      },
      {
        key: 'DOSE',
        label: 'DOSIS',
        value: data.dose
      },
      {
        key: 'VACCINATIONDATE',
        label: 'FECHA',
        value: data.vaccinationDate
      }
    ]
  },
  barcodes: [
    {
      format: 'PKBarcodeFormatQR',
      message: url,
      messageEncoding: 'utf-8',
      altText: 'CertiCovid'
    }
  ]
}
