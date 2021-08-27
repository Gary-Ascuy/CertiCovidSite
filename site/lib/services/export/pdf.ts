import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import QRCode from 'qrcode'

import { VaccinationInformation } from '../../models/VaccinationInformation'
import * as ga from '../../ga'

export async function loadPdfTemplate(url: string = '/templates/pdf/template.pdf') {
  const bytes = await fetch(url).then(res => res.arrayBuffer())
  const pdf = await PDFDocument.load(bytes)
  return pdf
}

export async function exportToPdf(url: string, vaccine: VaccinationInformation) {
  ga.event({ action: 'download', params: { type: 'pdf' } })

  const pdf = await loadPdfTemplate()
  const [page] = pdf.getPages()

  const black = rgb(0, 0, 0)
  const white = rgb(1, 1, 1)
  const maxWidth = 120

  // styles
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  page.setFont(font)
  page.setFontSize(14)
  page.setLineHeight(16)
  page.setFontColor(black)

  // name
  page.drawText(vaccine.name, { x: 66, y: 374, maxWidth: 324 })

  // styles
  page.setFontSize(13)
  page.setLineHeight(14)

  // ci and birthday
  page.drawText(vaccine.ci, { x: 65.05, y: 315.78, maxWidth })
  page.drawText(vaccine.birthday, { x: 233, y: 315.78, maxWidth })

  // municipality and vaccinationDate
  page.drawText(vaccine.municipality, { x: 61.98, y: 269, maxWidth })
  page.drawText(vaccine.vaccinationDate, { x: 233, y: 269, maxWidth })

  // style
  page.setFontSize(12)
  page.setLineHeight(13)
  page.setFontColor(white)

  // vaccine info
  page.drawText(vaccine.vaccine, { x: 56.57, y: 185.34, maxWidth: 80 })
  page.drawText(vaccine.dose, { x: 175.57, y: 185.34, maxWidth: 80 })
  page.drawText(vaccine.supplier, { x: 297, y: 185.34, maxWidth: 80 })

  // nextVaccinationDate
  const w = font.widthOfTextAtSize(vaccine.nextVaccinationDate || ' ', 12)
  page.drawText(vaccine.nextVaccinationDate, { x: 142 + (120 - w) / 2, y: 429, maxWidth: 120 })

  // QR Code
  const qrcode = await QRCode.toDataURL(url, { margin: 0, scale: 1, width: 500 })
  const image = await pdf.embedPng(qrcode)
  page.drawImage(image, {
    x: 126.6, y: 492.98,
    width: 144.8, height: 144.8
  })

  const bytes = await pdf.save()
  saveAs(new Blob([bytes]), `CertiCovid_${new Date().toISOString().replace(/\W/g, '_')}.pdf`)
}
