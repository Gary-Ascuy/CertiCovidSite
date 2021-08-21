import { Template } from '@walletpass/pass-js'
import fetch from 'node-fetch'

const templateUrl = process.env.COVID__PASS_TEMPLATE_URL || ''
const signerPemData = process.env.COVID__SIGNER_CERT_DATA || ''
const signerPemPassword = process.env.COVID__SIGNER_CERT_PASSWORD || ''
const encoding = 'base64'

export async function loadTemplate(url: string = templateUrl) {
  const data = await fetch(url)
  const buffer = await data.buffer()
  const template = await Template.fromBuffer(buffer)
  const signerPem = Buffer.from(signerPemData, encoding).toString()
  template.setCertificate(signerPem, signerPemPassword)
  return template
}
