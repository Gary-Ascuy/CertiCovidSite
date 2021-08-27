import type { NextApiRequest, NextApiResponse } from 'next'

import { buildApplePass } from '../../../lib/services/export/apple'
import { getData } from '../../../lib/services/web/crawler'
import { getCacheTemplate } from '../../../lib/services/utils/template'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const url = req.query.code as string
  const data = await getData(url)

  const template = await getCacheTemplate()
  const pass = template.createPass(buildApplePass(url, data))
  const buffer = await pass.asBuffer()

  const fileName = `CertiCovid_${new Date().toISOString().replace(/\W/g, '_')}.pkpass`
  res.setHeader('Content-Type', 'application/vnd.apple.pkpass')
  res.setHeader('Content-Disposition', `attachment; filename=${fileName}`)
  res.status(200).send(buffer)
}
