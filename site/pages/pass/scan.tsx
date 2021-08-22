import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false
})

const About: NextPage = () => {
  const router = useRouter()

  const handleScan = (data: string | null) => {
    if (data) {
      sessionStorage.setItem('covid-scan-url', data)
      router.push('/pass/preview')
    }
  }

  const handleError = (error: unknown) => console.error(error, "ERROR")

  return (
    <div>
      <Head>
        <title>Scan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ margin: '20px 20%' }}>
        <QrReader delay={300} onError={handleError} onScan={handleScan} />
      </main>
    </div>
  )
}

export default About
