import type { NextApiRequest, NextApiResponse } from 'next'
import { buildApplePass } from '../../lib/services/apple'
import { getData } from '../../lib/services/crawler'
import { getCacheTemplate } from '../../lib/services/template'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const url = req.query.code as string
  const data = await getData(url)

  const template = await getCacheTemplate()
  const pass = template.createPass(buildApplePass(url, data))
  const buffer = await pass.asBuffer()

  res.setHeader('Content-Type', 'application/vnd.apple.pkpass')
  res.setHeader('Content-Disposition', 'attachment; filename=certcovid.pkpass');
  res.status(200).send(buffer)
}
