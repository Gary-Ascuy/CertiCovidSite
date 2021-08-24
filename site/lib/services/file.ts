import { PNG } from 'pngjs'
import jsQR, { QRCode } from 'jsqr'

export async function getUrlFromFile(file: File): Promise<string> {
  const fileBuffer = await file.arrayBuffer()
  const image = await getImageDataFromPng(fileBuffer)
  const code: QRCode | null = jsQR(image.data, image.width, image.height, {
    inversionAttempts: 'dontInvert',
  })

  if (!code) throw new Error('Invalida data')
  return code.data
}

export async function getImageDataFromPng(fileBuffer: ArrayBuffer): Promise<ImageData> {
  return new Promise(async (resolve, reject) => {
    let png = new PNG({ filterType: 4 })
    png.parse(fileBuffer as Buffer, (error, data: any) => {
      if (error) reject()
      resolve(data)
    })
  })
}
