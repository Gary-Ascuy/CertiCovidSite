/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-html-link-for-pages */

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

import Metadata from '../lib/components/Metadata'
import Step from '../lib/components/Step'
import Preview from '../lib/components/Preview'
import Seo from '../lib/components/Seo'

import { ResponsePayload } from '../lib/models/ResponsePayload'
import { VaccinationInformation } from '../lib/models/VaccinationInformation'
import Header from '../lib/components/Header'

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })

const Home: NextPage = () => {
  const router = useRouter()

  const [url, setUrl] = useState('')
  const [code, setCode] = useState('')
  const [isCamVisible, setIsCamVisible] = useState(false)
  const [isPrivacityPolice, setIsPrivacityPolice] = useState(true)

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<ResponsePayload<VaccinationInformation> | null>(null)
  const [hasError, setHasError] = useState<Error | unknown | null>(null)

  const handleCamScan = (data: string | null) => {
    if (data) {
      setUrl(data)
      setCode(encodeURI(window.btoa(data)))
      setIsCamVisible(false)
    }
  }
  const handleCamError = (error: Error) => setHasError(error)

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!url) return
        setIsLoading(true)
        const request = await fetch(`/api/v1/person?code=${encodeURI(window.btoa(url))}`)
        setData(await request.json())
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setHasError(error)
      }
    }

    loadData()
  }, [url])

  return (
    <div className='md:w-2/3 xl:w-2/5 md:mx-auto flex flex-col min-h-screen justify-center px-5 py-12'>
      <Head><Metadata></Metadata></Head>
      <Seo />

      {/* CONTENT */}
      <main className='flex flex-col space-y-2'>
        {/* Title */}
        <Header></Header>

        {/* Context */}
        <div className="flex flex-col space-y-5">
          <div className='rounded-md p-6 bg-gray-100 space-y-4 font-light'>
            <p>
              Digitaliza tu Certificado de Vacunación con <span className='font-black text-primary'>CertiCovid</span>, añade tu certificado de vacunación a tus aplicaciones de billetera favoritas. En iOS, utiliza el navegador Safari.
            </p>

            <input id='privacity' defaultChecked={true} onChange={() => setIsPrivacityPolice(!isPrivacityPolice)} type='checkbox'></input>
            <label htmlFor='privacity'>&nbsp;
              Acepto las&nbsp;
              <a target='_blank' href='/terms-of-service' className='text-primary text-underline text-black'>
                Condiciones del servicio
              </a>
              &nbsp;y la&nbsp;
              <a target='_blank' href='/privacy-policy' className='text-primary text-underline text-black'>
                Politica de Privacidad
              </a>.
            </label>
          </div>
        </div>

        {/* Step 1 - Cargar Certificado */}
        {isPrivacityPolice &&
          <Step step='1' title='Cargar Certificado' >
            <div className='space-y-5 font-light'>
              <p>Escanea el código QR de tu certificado usando la cámara de tu dispositivo o selecciona y sube una imagen (PDF, Captura donde se vea claramente el QR).</p>
              <div className='grid grid-cols-1 md:grid-cols-1 gap-5'>
                <button onClick={() => setIsCamVisible(!isCamVisible)} type="button"
                  className="focus:outline-none h-8 bg-primary text-sm text-white hover:bg-primary-hover font-semibold rounded-md">
                  {isCamVisible ? 'Ocultar Cámara' : 'Abrir Cámara'}
                </button>
              </div>
              {isCamVisible &&
                <div>
                  <QrReader delay={300} onError={handleCamError} onScan={handleCamScan} />
                </div>
              }
            </div>
          </Step>
        }

        {/* Step 2 - Obtener Datos */}
        {isPrivacityPolice &&
          <Step step='2' title='Obtener Datos' enabled={!!data} >
            <div className='space-y-5 font-light'>
              <p>Recabando información de tu certificado del sitio oficial del ministerio de salud. Estamos validando tu información, esto tomará unos segundos.</p>

              {!isLoading &&
                <div className='flex flex-row items-center justify-center space-x-1'>
                  <span>
                    <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  &nbsp;&nbsp;Validando...
                </div>
              }

              {hasError &&
                <div className='bg-red-200 rounded-md text-center text-red-900 py-5'>No es posible optener datos del servidor, intente mas tarde</div>
              }

              {data && data.success && data.data &&
                <Preview person={data.data}></Preview>
              }
            </div>
          </Step>
        }

        {/* Step 3 - Descargar Certificado */}
        {isPrivacityPolice &&
          <Step step='3' title='Descargar Certificado' enabled={!!data}>
            <div className='space-y-5 font-light'>
              <p>Puedes añadirlo directamente a tu billetera móvil (ej. AppleWallet en iOS y WalletPasses en Android) o descargar un PDF en un formato amigable para celulares.</p>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <a href={`/api/v1/pass?code=${code}`}>
                  <Image src='/assets/buttons/Add_to_Apple_Wallet_rgb_ES.svg' height={100} width={300} alt='apple wallet button'></Image>
                </a>

                <div></div>

                <a onClick={() => alert('Under Construction')} href='#'>
                  <Image src='/assets/buttons/download_pdf.png' height={85} width={210} alt='download pdf button'></Image>
                </a>
              </div>
            </div>
          </Step>
        }
      </main>
    </div>
  )
}

export default Home
