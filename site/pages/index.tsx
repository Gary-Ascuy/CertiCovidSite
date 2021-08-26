/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-html-link-for-pages */

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'

import Metadata from '../lib/components/Metadata'
import Step from '../lib/components/Step'
import Preview from '../lib/components/Preview'
import Seo from '../lib/components/Seo'

import { ResponsePayload } from '../lib/models/ResponsePayload'
import { VaccinationInformation } from '../lib/models/VaccinationInformation'
import Header from '../lib/components/Header'
import { getUrlFromFile } from '../lib/services/file'
import { exportToPdf } from '../lib/services/pdf'
import { validateQrData } from '../lib/services/validation'

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })

const Home: NextPage = () => {
  const [url, setUrl] = useState('')
  const [code, setCode] = useState<string | null>('')
  const [isCamVisible, setIsCamVisible] = useState(false)
  const [isPrivacityPolice, setIsPrivacityPolice] = useState(true)

  const input = useRef<HTMLInputElement>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<ResponsePayload<VaccinationInformation> | null>(null)
  const [error, setError] = useState<unknown | null>(null)

  const setErrorMessage = (error: unknown) => {
    const message = _.isObject(error) ? (error as any)?.message : error
    setError(message || 'Error inesperado')
  }

  const validateAndUpdateUrl = useCallback((value: string) => {
    if (!value) return

    try {
      setError(null)
      setData(null)
      setCode(null)

      console.log('Trying to update URL with:', value)
      const { url } = validateQrData(value)

      setUrl(url)
      setCode(encodeURI(window.btoa(url)))
    } catch (error) {
      setErrorMessage(error)
    }
  }, [])

  const handleCamScan = (data: string | null) => {
    if (data) {
      validateAndUpdateUrl(data)
      setIsCamVisible(false)
    }
  }
  const handleCamError = (error: Error) => setErrorMessage(error)

  useEffect(() => {
    if (!url) return

    const loadData = async () => {
      try {
        setIsLoading(true)
        const request = await fetch(`/api/v1/person?code=${encodeURI(window.btoa(url))}`)
        setData(await request.json())
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setErrorMessage('No es posible obtener datos del servidor en este momento, por favor intente nuevamente mas tarde')
      }
    }

    loadData()
  }, [url])

  useEffect(() => {
    if (!input || !input.current) return;

    const processFile = async () => {
      try {
        const file = input?.current
        const selectedFile = (file?.files || [])[0]
        if (!!selectedFile) {
          const url = await getUrlFromFile(selectedFile)

          validateAndUpdateUrl(url)
          setIsCamVisible(false)
        }
      } catch (error) {
        setErrorMessage(error)
      }
    }

    input.current.addEventListener('input', processFile)
    return () => input?.current?.removeEventListener('input', processFile)
  }, [input, validateAndUpdateUrl])

  return (
    <div className='md:w-2/3 xl:w-2/5 md:mx-auto flex flex-col min-h-screen justify-center px-5 py-12'>
      <Head><Metadata></Metadata></Head>
      <Seo />

      {/* CONTENT */}
      <main className='flex flex-col space-y-2'>
        {/* Title */}
        <Header></Header>

        {/* Context */}
        <div className='flex flex-col space-y-5'>
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
          <Step step='1' title='Cargar Certificado Actual' >
            <div className='space-y-5 font-light'>
              <p>Escanea el código QR de tu certificado actual usando la cámara de tu dispositivo o selecciona y sube una imagen (PDF, Captura donde se vea claramente el QR).</p>
              <div className='grid grid-cols-2 gap-5'>
                <button onClick={() => setIsCamVisible(!isCamVisible)} type='button'
                  className='focus:outline-none h-8 bg-primary text-sm text-white hover:bg-primary-hover font-semibold rounded-md'>
                  {isCamVisible ? 'Ocultar Cámara' : 'Abrir Cámara'}
                </button>

                <canvas id='canvas' className='hidden' />
                <input type='file' id='file' className='hidden' accept='application/pdf,image/png' ref={input} />
                <label htmlFor='file'
                  className='focus:outline-none h-8 bg-primary text-sm text-white hover:bg-primary-hover text-center leading-8 font-semibold rounded-md'>
                  Cargar Archivo
                </label>
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
          <Step step='2' title='Obtener Datos' enabled={!!data || isLoading || !!error} >
            <div className='space-y-5 font-light'>
              <p>Recabando información de tu certificado del sitio oficial del ministerio de salud. Esto tomará unos segundos.</p>

              {isLoading &&
                <div className='flex flex-row items-center justify-center space-x-1'>
                  <span>
                    <svg className='animate-spin h-10 w-10 text-primary' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                  </span>
                  &nbsp;&nbsp;Validando...
                </div>
              }

              {error &&
                <div className='bg-red-200 rounded-md text-center text-red-900 py-5'>{error}.</div>
              }

              {data && data.success &&
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
              <div className='grid grid-cols-3 gap-5'>
                <a href={code ? `/api/v1/pass?code=${code}` : '#'}>
                  <Image src='/assets/buttons/Add_to_Apple_Wallet_rgb_ES.svg' height={100} width={300} alt='apple wallet button'></Image>
                  <div className='text-sm text-center'>Compatible con Android Wallets</div>
                </a>

                <div></div>

                <div className='cursor-pointer' onClick={() => data && data.data && exportToPdf(url, data.data)}>
                  <Image src='/assets/buttons/Add_to_PDF.svg' height={100} width={300} alt='download pdf button'></Image>
                </div>
              </div>
            </div>
          </Step>
        }
      </main>
    </div>
  )
}

export default Home
