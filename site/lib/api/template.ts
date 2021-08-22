import { Template } from '@walletpass/pass-js'
import { ApplePass } from '@walletpass/pass-js/dist/interfaces'
import fetch from 'node-fetch'

const templateUrl = process.env.COVID__PASS_TEMPLATE_URL || ''
const signerPemData = process.env.COVID__SIGNER_CERT_DATA || ''
const signerPemPassword = process.env.COVID__SIGNER_CERT_PASSWORD || ''
const encoding = 'base64'

export const cache: { [key: string]: Template } = {}

export async function loadTemplate(url: string = templateUrl): Promise<Template> {
  console.log('Loading template from server')

  const data = await fetch(url)
  const buffer = await data.buffer()
  const template = await Template.fromBuffer(buffer)
  const signerPem = Buffer.from(signerPemData, encoding).toString()
  template.setCertificate(signerPem, signerPemPassword)
  return template
}

export async function getCacheTemplate(key: string = 'default'): Promise<Template> {
  if (!cache[key]) {
    cache[key] = await loadTemplate()
  }

  return cache[key]
}

export interface DataInput {
  name: string
}

export function buildApplePass(data: DataInput): Partial<ApplePass> {
  return {}
}
