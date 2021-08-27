/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-html-link-for-pages */

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { isObject } from 'lodash'

import Step from './Step'
import Preview from './Preview'

import { ResponsePayload } from '../models/ResponsePayload'
import { VaccinationInformation } from '../models/VaccinationInformation'
import { getUrlFromFile } from '../services/import/file'
import { exportToPdf } from '../services/export/pdf'
import { getValidationError } from '../services/utils/validation'

import * as ga from '../ga'

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })

export default function Home() {
  const [url, setUrl] = useState('')
  const [code, setCode] = useState<string | null>('')
  const [isCamVisible, setIsCamVisible] = useState(false)
  const [isPrivacityPolice, setIsPrivacityPolice] = useState(true)

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<ResponsePayload<VaccinationInformation> | null>(null)
  const [error, setError] = useState<unknown | null>(null)

  const setErrorMessage = (error: unknown) => {
    const message = isObject(error) ? (error as any)?.message : error
    setError(message || 'Error inesperado')
  }

  const validateAndUpdateUrl = useCallback((value: string) => {
    if (!value) return

    try {
      setError(null)
      setData(null)
      setCode(null)

      const error = getValidationError(value)
      if (error) {
        setUrl('')
        setCode('')
        setError(error)
        return
      }

      const url = value
      setCode(encodeURI(window.btoa(url)))
      setUrl(url)
    } catch (error) {
      setErrorMessage(error)
    }
  }, [])

  const handleCamScan = (data: string | null) => {
    if (data) {
      ga.event({ action: 'upload', params: { type: 'camera' } })

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
        ga.event({ action: 'error', params: { type: 'loading' } })

        setIsLoading(false)
        setErrorMessage('No es posible obtener datos del servidor en este momento, por favor intente nuevamente mas tarde')
      }
    }

    loadData()
  }, [url])

  const processFileContent = async (selectorFiles: FileList | null) => {
    if (!selectorFiles) return

    const file = selectorFiles.item(0)
    if (!file) return

    try {
      const url = await getUrlFromFile(file)
      validateAndUpdateUrl(url)
    } catch (error) {
      setErrorMessage(error)
    }
  }

  return (
    <>
      {/* Context */}
      <div className='flex flex-col space-y-5'>
        <div className='rounded-md p-6 bg-gray-100 space-y-4 font-light'>
          <p>
            Digitaliza tu Certificado de Vacunación con <span className='font-black text-primary'>CertiCovid</span>, añade tu certificado de vacunación a tus aplicaciones de billetera favoritas. En iOS, utiliza el navegador Safari.
          </p>

          <input id='privacity' defaultChecked={true} onChange={() => setIsPrivacityPolice(!isPrivacityPolice)} type='checkbox'></input>
          <label htmlFor='privacity'>&nbsp;
            Acepto los&nbsp;
            <a target='_blank' href='/terms-of-service' className='text-primary hover:underline'>
              Términos y Condiciones
            </a>
            &nbsp;y la&nbsp;
            <a target='_blank' href='/privacy-policy' className='text-primary hover:underline'>
              Política de Privacidad
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
              <input type='file' id='file' onChange={(event) => processFileContent(event.target.files)} className='hidden' accept='application/pdf,image/png' />
              <label htmlFor='file' className='focus:outline-none h-8 bg-primary text-sm text-white hover:bg-primary-hover text-center leading-8 font-semibold rounded-md'>
                Cargar Archivo
              </label>
            </div>

            {isCamVisible &&
              <div>
                <QrReader delay={300} resolution={1000} onError={handleCamError} onScan={handleCamScan} />
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
            <div className='grid grid-cols-2 gap-5 md:grid-cols-3' >
              <a href={code ? `/api/v1/pass?code=${code}` : '#'} onClick={() => ga.event({ action: 'download', params: { type: 'pkpass' } })}>
                <Image src='/assets/buttons/Add_to_Apple_Wallet_rgb_ES.svg' height={100} width={300} alt='apple wallet button'></Image>
                <div className='text-sm text-center'>Compatible con Android Wallets</div>
              </a>

              <div className='hidden md:block'></div>

              <div className='cursor-pointer' onClick={() => data && data.data && exportToPdf(url, data.data)}>
                <Image src='/assets/buttons/Add_to_PDF.svg' height={100} width={300} alt='download pdf button'></Image>
              </div>
            </div>
          </div>
        </Step>
      }
    </>
  )
}
