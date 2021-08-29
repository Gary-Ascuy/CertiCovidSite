import { Template } from '@walletpass/pass-js'
import { ImageDensity, ImageType } from '@walletpass/pass-js/dist/lib/images'
import { promises as fs } from 'fs'
import 'dotenv/config'

import { passTypeIdentifier, teamIdentifier, value as data } from './data'

export async function createTemplate() {
  console.log('Creating Template')
  const template = new Template('generic', {
    passTypeIdentifier,
    teamIdentifier,
    sharingProhibited: false,
  })

  await template.loadCertificate(process.env.COVID__CERT_PATH as string, process.env.COVID__SIGNER_CERT_PASSWORD as string)

  console.log('Loading Images')
  const files: { path: string, type: ImageType, density: ImageDensity }[] = [{
    type: 'icon',
    path: './assets/icon.png',
    density: '1x'
  }, {
    type: 'logo',
    path: './assets/logo.png',
    density: '1x'
  }, {
    type: 'logo',
    path: './assets/logo@2x.png',
    density: '2x'
  }, {
    type: 'logo',
    path: './assets/logo@3x.png',
    density: '3x'
  }]

  for (const { type, path, density } of files) {
    const buffer = await fs.readFile(path)
    await template.images.add(type, buffer, density)
  }

  return template
}

export async function build() {
  const template = await createTemplate()

  const file = process.env.FILENAME as string
  console.log(`Generating PASS file into: ${file}`)
  const pass = template.createPass(data)
  const buffer = await pass.asBuffer()

  console.log('Saving file')
  await fs.writeFile(file, buffer, { encoding: 'utf-8' })
  console.log('COMPLETED!!!')
}

build()
