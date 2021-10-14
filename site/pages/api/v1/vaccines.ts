import type { NextApiRequest, NextApiResponse } from 'next'

import { ResponsePayload } from '../../../lib/models/ResponsePayload'
import { VaccinationInformation } from '../../../lib/models/VaccinationInformation'
import { getData } from '../../../lib/services/web/colombia'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponsePayload<VaccinationInformation>>,
) {
  const url = process.env.TEST_DATA ?? ''
  const data = await getData(url)
  res.status(200).json(data)
}
