import { NextSeo } from "next-seo";
import React from "react";

export interface MetadataProps {
  title?: string
  description?: string
}

export default function Seo({
  title = 'CertiCovid - Certificado Digital de Vacuna',
  description = 'CertiCovid convierte tu certificado de vacuna en una versión digital para que lo lleves en tu celular'
}: MetadataProps) {
  return (
    <NextSeo
      noindex={true}
      title={title}
      description={description}

      openGraph={{
        title,
        description,
        type: 'website',
        url: 'https://bo.certicovid.me',
        images: [
          {
            url: 'https://bo.certicovid.me/assets/cover.png',
            width: 387,
            height: 425,
            alt: 'CertiCovid Cover',
          },
        ],
      }}
    />
  )
}
