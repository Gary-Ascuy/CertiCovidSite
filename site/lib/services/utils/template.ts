import { Template } from '@walletpass/pass-js'

import { decrypt } from './crypto'
import { getBuffer } from './fetch'

const templateUrl = process.env.COVID__PASS_TEMPLATE_URL || ''
const keyUrl = process.env.COVID__KEY_URL || ''

const signerPemPassword = process.env.COVID__SIGNER_CERT_PASSWORD || ''

export const cache: { [key: string]: Template } = {}

export async function loadTemplate(url: string = templateUrl): Promise<Template> {
  console.log('Getting keys from server')
  const key = await getBuffer(keyUrl)
  const signerPemData = decrypt(key.toString())

  console.log('Getting template from server')
  const buffer = await getBuffer(url)
  const template = await Template.fromBuffer(buffer)

  console.log('Updating certs on template')
  template.setCertificate(signerPemData, signerPemPassword)
  return template
}

export async function getCacheTemplate(key: string = 'default'): Promise<Template> {
  if (!cache[key]) {
    cache[key] = await loadTemplate()
  }

  return cache[key]
}
