import type { NextApiRequest, NextApiResponse } from 'next'
import { getData } from '../../../lib/services/crawler'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { success, data } = await getData(req.query.code as string)
  const info = {
    name: data['NOMBRE COMPLETO'],
    ci: data['DOCUMENTO DE IDENTIDAD'],
    birthday: data['FECHA NACIMIENTO'],

    departament: data['DEPARTAMENTO'],
    municipality: data['MUNICIPIO'],
    establishment: data['ESTABLECIMIENTO'],

    vaccine: data['VACUNA'],
    vaccinationDate: data['FECHA VACUNACION'],
    dose: data['DOSIS'],
    supplier: data['PROVEEDOR'],
    lot: data['LOTE'],
    consentNumber: data['NRO CONSENTIMIENTO'],
    nextVaccinationDate: data['FECHA PROXIMA VACUNACION']
  }

  res.status(200).json({ success, data: info })
}
