import { Template } from '@walletpass/pass-js'
import { ImageDensity, ImageType } from '@walletpass/pass-js/dist/lib/images'
import path from 'path'
import { promises as fs } from 'fs'
import 'dotenv/config'

import { passTypeIdentifier, teamIdentifier, value as data } from './data'

export const ApplePassTemplate = {
  passTypeIdentifier,
  teamIdentifier,
  sharingProhibited: false,
  labelColor: 'rgb(200, 200, 200)',
  backgroundColor: 'rgb(2, 60, 82)',
  foregroundColor: 'rgb(255, 255, 255)',
}

export async function createTemplate() {
  console.log('Creating Template')
  const template = new Template('generic', ApplePassTemplate)
  await template.loadCertificate(process.env.COVID__CERT_PATH as string, process.env.COVID__SIGNER_CERT_PASSWORD as string)

  console.log('Loading Images')
  // Use the 8-bit color palette for PNG graphics that don’t require full 24-bit color
  const files: { file: string, type: ImageType, density: ImageDensity }[] = [{
    type: 'icon',
    file: './assets/icon.png',
    density: '1x'
  }, {
    type: 'icon',
    file: './assets/icon@2x.png',
    density: '2x'
  }, {
    type: 'icon',
    file: './assets/icon@3x.png',
    density: '3x'
  }, {
    type: 'logo',
    file: './assets/logo.png',
    density: '1x'
  }, {
    type: 'logo',
    file: './assets/logo@2x.png',
    density: '2x'
  }, {
    type: 'logo',
    file: './assets/logo@3x.png',
    density: '3x'
  }]

  for (const { type, file, density } of files) {
    const buffer = await fs.readFile(path.join(__dirname, file))
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
