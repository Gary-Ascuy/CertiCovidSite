import { NextSeo } from 'next-seo'
import { OpenGraphImages } from 'next-seo/lib/types'

export interface MetadataProps {
  title?: string
  description?: string
  url?: string
  image?: OpenGraphImages
}

export default function Seo({
  title = 'CertiCovid - Certificado Digital de Vacuna',
  description = 'CertiCovid convierte tu certificado de vacuna en una versión digital para que lo lleves en tu celular',
  url = 'https://bo.certicovid.me',
  image = {
    url: 'https://bo.certicovid.me/assets/cover.png',
    alt: 'CertiCovid Cover',
    width: 387,
    height: 425,
  }
}: MetadataProps) {
  const og = { title, description, type: 'website', url, images: [image] }
  return (
    <NextSeo noindex={true} title={title} description={description} openGraph={og} />
  )
}
