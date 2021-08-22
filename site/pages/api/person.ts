import type { NextApiRequest, NextApiResponse } from 'next'
import { getData } from '../../lib/services/crawler'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await getData(req.query.code as string)
  res.status(200).json(data)
}
