import type { NextApiRequest, NextApiResponse } from 'next'
import { buildApplePass } from '../../lib/services/apple'
import { getData } from '../../lib/services/crawler'
import { getCacheTemplate } from '../../lib/services/template'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await getData(req.query.code as string)

  const template = await getCacheTemplate()
  const pass = template.createPass(buildApplePass(data))
  const buffer = await pass.asBuffer()

  res.setHeader('Content-Type', 'application/vnd.apple.pkpass')
  res.setHeader('Content-Disposition', 'attachment; filename=certcovid.pkpass');
  res.status(200).send(buffer)
}
