import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import Metadata from '../lib/components/Metadata'
import Seo from '../lib/components/Seo'
import Header from '../lib/components/Header'

const About: NextPage = () => {
  return (
    <div className='md:w-2/3 xl:w-2/5 md:mx-auto flex flex-col min-h-screen justify-center px-5 py-12'>
      <Head><Metadata title='CertiCovid - Quienes Somos?'></Metadata></Head>
      <Seo title='CertiCovid - Quienes Somos?' description='CertiCovid - Quienes Somos?' />

      <main className='flex flex-col space-y-2'>
        <Header title='Quienes Somos?' className='text-3xl'></Header>

        <div className='flex flex-col space-y-5'>
          <div className='rounded-md p-6 bg-gray-100 space-y-4 '>
            <div className='text-primary font-black'>
              CertiCovid - Certificado Digital de Vacuna
            </div>
            <div className='font-light border-1 text-justify'>
              CertiCovid convierte tu certificado de vacuna en una versión digital para que lo lleves en tu celular.
            </div>

            <div className='text-primary font-black'>
              Motivacion, Porque?
            </div>
            <div className='font-light border-1 text-justify'>
              bla bla bla bla.
            </div>


            <div className='text-primary font-black'>
              Equipo de Desarrollo
            </div>
            <div className='font-light text-justify'>
              <ul className='px-4 list-disc list-inside'>
                <li>Gary Ascuy (@garyascuy)</li>
                <li>Rodrigo Ergueta (@rodrigoergueta)</li>
                <li>Ramiro Ergueta (@ramiroergueta)</li>
              </ul>
            </div>
          </div>

          <div className='p-1 text-center font-light'>
            Copyright @ 2021
          </div>
        </div>
      </main>
    </div>
  )
}

export default About
