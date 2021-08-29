/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-html-link-for-pages */

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { isObject } from 'lodash'

import Step from './Step'
import Preview from './Preview'
import Loading from './Loading'

import { ResponsePayload } from '../models/ResponsePayload'
import { VaccinationInformation } from '../models/VaccinationInformation'

import { getValidationError } from '../services/utils/validation'
import { getUrlFromFile } from '../services/import/file'
import { exportToPdf } from '../services/export/pdf'
import { exportToPass } from '../services/export/pass'

import * as ga from '../ga'

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })

export default function Home() {
  const [url, setUrl] = useState('')
  const [code, setCode] = useState<string | null>('')
  const [isCamVisible, setIsCamVisible] = useState(false)
  const [isPrivacityPolice, setIsPrivacityPolice] = useState(true)

  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<unknown | null>(null)


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
      setErrorMessage('Error inesperado')
    }
  }, [])

  const handleCamScan = (data: string | null) => {
    if (data) {
      ga.event({ action: 'upload', params: { type: 'camera' } })

      validateAndUpdateUrl(data)
      setIsCamVisible(false)
    }
  }
  const handleCamError = (error: Error) => {
    setErrorMessage('No se pudo iniciar la cámara. Intente en otro dispositivo')
  }

  const downloadPdf = async (vaccine: VaccinationInformation) => {
    try {
      setDownloadError(null)
      setIsDownloading(true)
      await exportToPdf(url, vaccine)
    } catch (error) {
      setDownloadError('Error inesperado intentanto descargar PDF')
    } finally {
      setIsDownloading(false)
    }
  }

  const downloadPass = async (url: string, vaccine: VaccinationInformation) => {
    try {
      setDownloadError(null)
      setIsDownloading(true)
      await exportToPass(url, vaccine)
    } catch (error) {
      setDownloadError('Error inesperado intentando descargar Apple Wallet')
    } finally {
      setIsDownloading(false)
    }
  }

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
            <p>Escanea el código QR de tu certificado actual usando la cámara de tu dispositivo o selecciona y sube una imagen (PDF o imagen en formato PNG donde se vea claramente el QR).</p>
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

            {isLoading && <Loading message='Validando...'></Loading>}
            {error && <div className='bg-red-200 rounded-md text-center text-red-900 py-5'>{error}.</div>}
            {data && data.success && <Preview person={data.data}></Preview>}
          </div>
        </Step>
      }

      {/* Step 3 - Descargar Certificado */}
      {isPrivacityPolice &&
        <Step step='3' title='Descargar Certificado' enabled={!!data}>
          <div className='space-y-5 font-light'>
            <p>Puedes añadirlo directamente a tu billetera móvil (ej. AppleWallet en iOS y&nbsp;
              <a className='hover:underline text-primary font-light' target='_blank' href='https://play.google.com/store/apps/details?id=io.walletpasses.android' rel="noreferrer">
                WalletPasses en Android
              </a>
              .) o descargar un PDF en un formato amigable para celulares.
            </p>

            {downloadError && <div className='bg-red-200 rounded-md text-center text-red-900 py-5'>{downloadError}.</div>}
            {isDownloading && <Loading message='Descargando ...'></Loading>}

            {!isDownloading &&
              <div className='grid grid-cols-2 gap-5 md:grid-cols-3'>
                <div>
                  <div className='cursor-pointer' onClick={() => data && data.data && downloadPass(`/api/v1/pass?code=${code}`, data.data)}>
                    <img className='w-full hover:shadow-lg rounded-2xl' src='/assets/buttons/Add_to_Apple_Wallet_rgb_ES.svg' alt='apple wallet button'></img>
                  </div>

                  <div className='text-sm p-2 text-center'>
                    <a className='hover:underline text-primary font-light' target='_blank' href='https://play.google.com/store/apps/details?id=io.walletpasses.android' rel="noreferrer">
                      Compatible con Android Wallets
                    </a>
                  </div>
                </div>

                <div className='hidden md:block'></div>

                <div className='cursor-pointer' onClick={() => data && data.data && downloadPdf(data.data)}>
                  <img className='w-full hover:shadow-lg rounded-2xl' src='/assets/buttons/Add_to_PDF.svg' alt='download pdf button'></img>
                </div>
              </div>
            }
          </div>
        </Step>
      }
    </>
  )
}
