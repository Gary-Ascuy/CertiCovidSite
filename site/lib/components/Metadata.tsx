export interface MetadataProps {
  title?: string
}

export default function Metadata({ title }: MetadataProps) {
  return (
    <>
      <title>{title || 'CertiCovid - Certificado Digital de Vacuna'}</title>
      <meta name="description" content="CertiCovid convierte tu certificado de vacuna en una versión digital para que lo lleves en tu celular" />

      <link rel="apple-touch-icon" sizes="57x57" href="/assets/favicon/apple-icon-57x57.png"></link>
      <link rel="apple-touch-icon" sizes="60x60" href="/assets/favicon/apple-icon-60x60.png"></link>
      <link rel="apple-touch-icon" sizes="72x72" href="/assets/favicon/apple-icon-72x72.png"></link>
      <link rel="apple-touch-icon" sizes="76x76" href="/assets/favicon/apple-icon-76x76.png"></link>
      <link rel="apple-touch-icon" sizes="114x114" href="/assets/favicon/apple-icon-114x114.png"></link>
      <link rel="apple-touch-icon" sizes="120x120" href="/assets/favicon/apple-icon-120x120.png"></link>
      <link rel="apple-touch-icon" sizes="144x144" href="/assets/favicon/apple-icon-144x144.png"></link>
      <link rel="apple-touch-icon" sizes="152x152" href="/assets/favicon/apple-icon-152x152.png"></link>
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-icon-180x180.png"></link>
      <link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon/android-icon-192x192.png"></link>
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png"></link>
      <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon/favicon-96x96.png"></link>
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png"></link>
    </>
  )
}
