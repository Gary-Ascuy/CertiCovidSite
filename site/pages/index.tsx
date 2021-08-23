/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-html-link-for-pages */

import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false
})

const Home: NextPage = () => {
  const router = useRouter()

  const [url, setUrl] = useState('')
  const [code, setCode] = useState('')
  const [isCamVisible, setIsCamVisible] = useState(false)
  const [isPrivacityPolice, setIsPrivacityPolice] = useState(true)
  
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<unknown | null>(null)
  const [hasError, setHasError] = useState<unknown | null>(null)

  const handleCamScan = (data: string | null) => {
    if (data) {
      setUrl(data)
      setCode(encodeURI(window.btoa(data)))
      setIsCamVisible(false)
    }
  }
  const handleCamError = (error: Error) => setHasError(error)

  // load data from server
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!url) return
        setIsLoading(true)
        const request = await fetch(`/api/person?code=${encodeURI(window.btoa(url))}`)
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
      <Head>
        <title>Certi Covid</title>
        <meta name="description" content="Certi Covid" />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>
      <main className='flex flex-col space-y-2'>
        
        {/* Title */}
        <div className='flex flex-row items-center p-3 justify-center space-x-1'>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shield-check" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#006C9D" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 12l2 2l4 -4" />
            <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
          </svg>
          <div className='text-3xl font-bold text-primary'>CertiCovid Bolivia</div>
        </div>

        {/* Context */}
        <div className="flex flex-col space-y-5">
          <div className='rounded-md p-6 bg-gray-100 space-y-4 font-light'>
            <p>
              Digitaliza tu Certificado de Vacunación con <span className='font-black text-primary'>CertiCovid</span>, añade tu certificado de vacunación a tus aplicaciones de billetera favoritas. En iOS, utiliza el navegador Safari.
            </p>
            <input id='privacity' defaultChecked={true} onChange={() => setIsPrivacityPolice(!isPrivacityPolice)} type='checkbox'></input>
            <label htmlFor='privacity'>&nbsp;
              Acepto la <a target='_blank' href='/privacity' className='text-primary text-underline text-black'>Politica de Privacidad</a>
            </label>
          </div>
        </div>

        {/* Step 1 - Select QR/Image */}
        { isPrivacityPolice &&
          <div className="flex flex-col space-y-5">
            <div className='rounded-md p-6 bg-gray-100 space-y-4'>
              <div className='flex flex-row items-center'>
                <div className="rounded-md p-4 bg-blue-400 h-5 w-5 flex items-center justify-center">
                  <p className="text-white text-lg font-bold">1</p>
                </div>
                <div className="ml-3 font-bold text-xl text-primary">Selecciona tu Certificado</div>
              </div>

              <div className='text-lg'>
                <div className='space-y-5 font-light'>
                  <p>Escanea el código QR de tu certificado o selecciona una captura de pantalla o la página PDF con el código QR</p>
                  <div className='grid grid-cols-1 md:grid-cols-1 gap-5'>
                    <button onClick={() => setIsCamVisible(!isCamVisible)} type="button" className="focus:outline-none h-8 bg-primary text-sm text-white hover:bg-primary-hover font-semibold rounded-md">{isCamVisible ? 'Ocultar Cámara' : 'Iniciar Cámara' }</button>
                  </div>
                  { isCamVisible &&
                    <div>
                      <QrReader delay={300} onError={handleCamError} onScan={handleCamScan} />
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        }

        {/* Step 2 - Loading Data */}
        { isPrivacityPolice &&
          <div className={ `flex flex-col space-y-5 ${ data ? '' : 'opacity-50'}` }>
            <div className='rounded-md p-6 bg-gray-100 space-y-4'>
              <div className='flex flex-row items-center'>
                <div className="rounded-md p-4 bg-blue-400 h-5 w-5 flex items-center justify-center">
                  <p className="text-white text-lg font-bold">2</p>
                </div>
                <div className="ml-3 font-bold text-xl text-primary">Obteniendo Datos</div>
              </div>

              <div className='text-lg'>
                <div className='space-y-5 font-light'>
                  <p>Solicitando informaicon para la generacion de certificado digital.</p>
                  { isLoading &&
                    <div className='flex flex-row items-center justify-center space-x-1'>
                      <span>
                        <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    </div>
                  }
                  { hasError &&
                    <div className='bg-red-200 rounded-md text-center text-red-900 py-5'>No es posible optener datos del servidor, intente mas tarde</div>
                  }

                  { data &&
                    <div className='grid gap-4 grid-cols-2'>
                      <div className='col-span-2'>
                        <div className='text-gray-400 text-sm'>Nombres y Apellidos</div>
                        <div className='text-black font-medium text-lg'>Gary Ascuy Anturiano</div>
                      </div>
                      <div>
                        <div className='text-gray-400 text-xs'>Nro. Documento:</div>
                        <div className='text-black font-medium text-sm'>7654321</div>
                      </div>
                      <div>
                        <div className='text-gray-400 text-xs'>Fecha de Nacimiento:</div>
                        <div className='text-black font-medium text-sm'>01/05/2001</div>
                      </div>
                      <div>
                        <div className='text-gray-400 text-xs'>Municipio:</div>
                        <div className='text-black font-medium text-sm'>COCHABAMBA</div>
                      </div>
                      <div>
                        <div className='text-gray-400 text-xs'>Fecha de Vacunación:</div>
                        <div className='text-black font-medium text-sm'>12/08/2021</div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        }

        {/* Step 2 - Download */}
        { isPrivacityPolice &&
          <div className={ `flex flex-col space-y-5 ${ data ? '' : 'opacity-50'}` }>
            <div className='rounded-md p-6 bg-gray-100 space-y-4'>
              <div className='flex flex-row items-center'>
                <div className="rounded-md p-4 bg-blue-400 h-5 w-5 flex items-center justify-center">
                  <p className="text-white text-lg font-bold">3</p>
                </div>
                <div className="ml-3 font-bold text-xl text-primary">Añade a Billetera</div>
              </div>

              <div className='text-lg'>
                <div className='space-y-5 font-light'>
                  <p>Descarga el certificado en tu billetera movil o de manera Digital en un formato amigable para celular.</p>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <a href={`/api/pass?code=${code}`}>
                      <Image src='/assets/buttons/Add_to_Apple_Wallet_rgb_ES.svg' height={64} width={210} alt='apple wallet button'></Image>
                    </a>
                    <div></div>
                    <button type="button" className="focus:outline-none h-16 bg-primary text-sm text-white hover:bg-primary-hover font-semibold rounded-lg">Preview</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </main>
    </div>



    // <div className={styles.container}>
    //   <Head>
    //     <title>Certi Covid</title>
    //     <meta name="description" content="Certi Covid" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    //   <main>
    //     <h1 className={styles.header}>
    //       <Image className={styles.cert} src='/assets/icons/cert.svg' height={40} width={40} alt='certificado'></Image>
    //       <div className={styles.title}>CertiCovid</div>
    //       <Image className={styles.flag} src='/assets/icons/bolivia.svg' height={40} width={40} alt='bolivia'></Image>
    //     </h1>

    //     <div className={styles.content}>
    //       <div className={ `${styles.side} ${styles.image}` }>
    //         <Image className={styles.flag} src='/assets/backgrounds/phone.png' height={723} width={352} alt='bolivia'></Image>
    //       </div>

    //       <div className={ `${styles.side} ${styles.principal}` } >
    //         <div className={styles.titleSteps}>
    //           Digitaliza tu Certificado de Vacunación con <span>CertiCovid</span>
    //         </div>
    //         <div className={styles.description}>
    //           Añade tu certificado de Vacunación a tus aplicaciones de billetera favoritas. En iOS, utiliza el navegador Safari.
    //         </div>
    //         <div className={styles.stepText}>
    //           <span>1.</span> Escanea el código QR de tu certificado o selecciona una captura de pantalla o la página PDF con el código QR
    //         </div>

    //         <Button className={styles.cam} onClick={() => router.push('/covid/scan')} text='Iniciar Cámara'></Button>

    //         <div className={styles.stepText}>
    //           <span>2.</span> Descarga el certificado en tu billetera movil o de manera Digital en un formato amigable para celular.
    //         </div>
    //       </div>
    //     </div>
    //   </main>

    //   <footer className={styles.footer}>
    //     <a href="https://github.com/Gary-Ascuy/Covid-Cert" target="_blank" rel="noopener noreferrer">
    //       Powered by Covid Friends
    //     </a>
    //   </footer>
    // </div>
  )
}

export default Home
