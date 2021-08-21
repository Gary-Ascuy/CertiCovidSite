// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import fs from 'fs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  
  const buffer = Buffer.from(data, 'base64')
  res.setHeader('Content-Type', 'application/vnd.apple.pkpass')
  res.setHeader('Content-Disposition', 'attachment; filename=certcovid.pkpass');
  res.status(200).send(buffer)
}
