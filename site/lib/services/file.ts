import { PNG } from 'pngjs'
import jsQR, { Options, QRCode } from 'jsqr'
import * as PdfJS from 'pdfjs-dist'

PdfJS.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PdfJS.version}/pdf.worker.js`

const options: Options = { inversionAttempts: 'dontInvert' }

export const loaders: { [key: string]: (fileBuffer: ArrayBuffer) => Promise<ImageData> } = {
  'application/pdf': (fileBuffer: ArrayBuffer) => getImageDataFromPdf(fileBuffer),
  'image/png': (fileBuffer: ArrayBuffer) => getImageDataFromPng(fileBuffer),
}

export async function getUrlFromFile(file: File): Promise<string> {
  const fileBuffer = await file.arrayBuffer()

  const loader = loaders[file.type]
  if (!loader) throw Error('does not exist loader')
  const { data, width, height } = await loader(fileBuffer)

  const code: QRCode | null = jsQR(data, width, height, options)
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

export async function getImageDataFromPdf(fileBuffer: ArrayBuffer): Promise<ImageData> {
  const typedArray = new Uint8Array(fileBuffer)
  const pdfScale = 2

  const canvas = <HTMLCanvasElement>document.getElementById('canvas')
  const canvasContext = canvas.getContext('2d')
  if (!canvasContext) throw new Error('Unable to create context')

  let loadingTask = PdfJS.getDocument(typedArray)
  await loadingTask.promise.then(async function (pdfDocument) {
    const pageNumber = pdfDocument.numPages
    const pdfPage = await pdfDocument.getPage(pageNumber)
    const viewport = pdfPage.getViewport({ scale: pdfScale })

    canvas.width = viewport.width
    canvas.height = viewport.height
    const renderTask = pdfPage.render({ canvasContext, viewport })

    return await renderTask.promise
  })

  return canvasContext.getImageData(0, 0, canvas.width, canvas.height)
}
