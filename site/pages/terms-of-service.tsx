import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Header from '../lib/components/Header'
import Metadata from '../lib/components/Metadata'
import Seo from '../lib/components/Seo'

const TermsOfService: NextPage = () => {
  return (
    <div className='md:w-2/3 xl:w-2/5 md:mx-auto flex flex-col min-h-screen justify-center px-5 py-12'>
      <Head><Metadata title='CertiCovid - Términos y Condiciones'></Metadata></Head>
      <Seo title='CertiCovid - Términos y Condiciones' description='CertiCovid - Términos y Condiciones' />

      <main className='flex flex-col space-y-2'>
        <Header title='Términos y Condiciones' className='text-3xl'></Header>

        <div className='flex flex-col space-y-5'>
          <div className='rounded-md p-6 bg-gray-100 space-y-4 font-light'>
            <p className='p-2 text-justify'>
              Tenga en cuenta que no somos los emisores de los certificados originales y no estamos conectados de ninguna manera con las autoridades oficiales del Gobierno ni los representamos de ninguna manera. Estamos transfiriendo toda la información que figura y contiene el Carnet de Vacunación COVID-19 emitido por el Ministerio de Salud y Deportes del Estado Plurinacional de Bolivia y el mismo código QR de validación de su certificado original en papel/PDF al formato digital, y la funcionalidad se ha probado con todas las aplicaciones de validación disponibles en el momento del desarrollo.  Se aclara que el uso de la imagen de Gobierno y el Imagotipo en la aplicación, se atribuye al uso original por parte del Ministerio de Salud y Deportes del Estado Plurinacional de Bolivia al transferirse toda la información y contenido del Carnet de Vacunación COVID-19, emitido por ese Ministerio.
            </p>
            <p className='p-2 text-justify'>
              <span className='font-black text-primary'>CertiCovid</span> no reemplaza el Certificado emitido por el Ministerio de Salud, solo lo digitaliza. Le recomendamos encarecidamente que tenga a mano su certificado original y busque activamente la información y las medidas más recientes del uso del certificado en el Pais.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TermsOfService
