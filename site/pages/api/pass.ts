import type { NextApiRequest, NextApiResponse } from 'next'
import { getCacheTemplate, buildApplePass } from '../../lib/api/template'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const template = await getCacheTemplate()
  const pass = template.createPass(buildApplePass({ name: 'Gary Ascuy' }))
  const buffer = await pass.asBuffer()

  res.setHeader('Content-Type', 'application/vnd.apple.pkpass')
  res.setHeader('Content-Disposition', 'attachment; filename=certcovid.pkpass');
  res.status(200).send(buffer)
}
