import type { NextApiRequest, NextApiResponse } from 'next'

import { ResponsePayload } from '../../../lib/models/ResponsePayload'
import { VaccinationInformation } from '../../../lib/models/VaccinationInformation'
import { getData } from '../../../lib/services/web/crawler'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponsePayload<VaccinationInformation>>,
) {
  const data = await getData(req.query.code as string)
  res.status(200).json(data)
}
