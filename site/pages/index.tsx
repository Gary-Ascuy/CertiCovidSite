/* eslint-disable @next/next/link-passhref */
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import Button from '../lib/components/button/Button'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Certi Covid</title>
        <meta name="description" content="Certi Covid" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.header}>
          <Image className={styles.cert} src='/assets/icons/cert.svg' height={40} width={40} alt='certificado'></Image>
          <div className={styles.title}>CertiCovid</div>
          <Image className={styles.flag} src='/assets/icons/bolivia.svg' height={40} width={40} alt='bolivia'></Image>
        </h1>

        <div className={styles.content}>
          <div className={ `${styles.side} ${styles.image}` }>
            <Image className={styles.flag} src='/assets/backgrounds/phone.png' height={723} width={352} alt='bolivia'></Image>
          </div>

          <div className={ `${styles.side} ${styles.principal}` } >
            <div className={styles.titleSteps}>
              Digitaliza tu Certificado de Vacunación con <span>CertiCovid</span>
            </div>
            <div className={styles.description}>
              Añade tu certificado de Vacunación a tus aplicaciones de billetera favoritas. En iOS, utiliza el navegador Safari.
            </div>
            <div className={styles.stepText}>
              <span>1.</span> Escanea el código QR de tu certificado o selecciona una captura de pantalla o la página PDF con el código QR
            </div>

            <Button className={styles.cam} onClick={() => router.push('/covid/scan')} text='Iniciar Cámara'></Button>

            <div className={styles.stepText}>
              <span>2.</span> Descarga el certificado en tu billetera movil o de manera Digital en un formato amigable para celular.
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/Gary-Ascuy/Covid-Cert" target="_blank" rel="noopener noreferrer">
          Powered by Covid Friends
        </a>
      </footer>
    </div>
  )
}

export default Home
