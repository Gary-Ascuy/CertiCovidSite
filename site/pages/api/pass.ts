import type { NextApiRequest, NextApiResponse } from 'next'
import { loadTemplate } from '../../lib/api/cache'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const template = await loadTemplate()
  const pass = template.createPass({
    serialNumber: '612088260994b',
    description: 'GARY',
    "backgroundColor": "rgb(0,130,238)",
    "foregroundColor": "rgb(255,255,255)",
    'logoText': 'Cert Covid Bolivia',
    "barcode": {
      "format": "PKBarcodeFormatQR",
      "message": "gary.com",
      "messageEncoding": "iso-8859-1",
      "altText": ""
    },
    "barcodes": [{
      "format": "PKBarcodeFormatQR",
      "message": "https://sus.minsalud.gob.bo/busca_vacuna_dosisqr?dosis=2da%20DOSIS&ci=3119960&fechanacimiento=16/07/1982",
      "messageEncoding": "iso-8859-1",
      "altText": ""
    }],
    'generic': {
      'primaryFields': [
        {
          'key': 'primary',
          'label': 'Name',
          'value': new Date().toLocaleTimeString()
        },
      ],
      'secondaryFields': [
        {
          'key': 'secondary1',
          'label': 'CI',
          'value': '68471268',
          'changeMessage': 'Changed to %@'
        },
        {
          'key': 'secondary2',
          'label': 'CI',
          'value': '68471268',
          'changeMessage': 'Changed to %@'
        },
        {
          'key': 'secondary3',
          'label': 'CI',
          'value': '68471268',
          'changeMessage': 'Changed to %@'
        },
        {
          'key': 'secondary4',
          'label': 'CI',
          'value': '68471268',
          'changeMessage': 'Changed to %@'
        }
      ],
      'backFields': [
        {
          'key': 'backField1',
          'label': 'backField',
          'value': 'AAAAAAAAA',
        },
        {
          'key': 'backField2',
          'label': 'backField',
          'value': 'BBBBBBBBB',
        },
        {
          'key': 'backField3',
          'label': 'backField',
          'value': 'CCCCCCCCC',  
        },
        {
          'key': 'backField4',
          'label': 'backField',
          'value': 'DDDDDDDDD',  
        },
        {
          'key': 'team',
          'label': 'Team',
          'value': 'Los Amigos Del Mani'
        },
      ]
    }
  })

  const buffer = await pass.asBuffer()
  res.setHeader('Content-Type', 'application/vnd.apple.pkpass')
  res.setHeader('Content-Disposition', 'attachment; filename=certcovid.pkpass');
  res.status(200).send(buffer)
}
