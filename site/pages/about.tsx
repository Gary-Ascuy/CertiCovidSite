import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import Metadata from '../lib/components/Metadata'
import Seo from '../lib/components/Seo'
import Header from '../lib/components/Header'
import Footer from '../lib/components/Footer'

const About: NextPage = () => {
  return (
    <div className='md:w-2/3 xl:w-2/5 md:mx-auto flex flex-col min-h-screen px-5 pt-12'>
      <Head><Metadata title='CertiCovid - ¿Quiénes somos?'></Metadata></Head>
      <Seo title='CertiCovid - ¿Quiénes somos?' description='CertiCovid - ¿Quiénes somos?' />

      <main className='flex flex-col space-y-2'>
        <Header title='¿Quiénes somos?' className='text-3xl'></Header>

        <div className='flex flex-col space-y-5'>
          <div className='rounded-md p-6 bg-gray-100 space-y-4 '>
            <div className='text-primary font-black'>
              CertiCovid - Certificado Digital de Vacuna CertiCovid
            </div>
            <div className='font-light border-1 text-justify'>
              Digitaliza tu certificado de vacunación de manera gratuita y llévalo en tu celular.
            </div>

            <div className='text-primary font-black'>
              Motivación
            </div>
            <div className='font-light border-1 text-justify'>
              Después de haber probado las alternativas existentes: imprimir y llevar nuestro certificado tamaño carta en el bolsillo, portar la versión impresa en PVC (plástico) o incluso comprar una camiseta con el certificado estampado, nos topábamos con que el papel se deteriora, los QRs impresos en plástico no podían ser leídos o las camisetas se  ensucian, siempre volvíamos a descargar el certificado y guardarlo en el celular (en formatos no amigables).
            </div>
            <div className='font-light border-1 text-justify'>
              Nuestros celulares son algo que siempre llevamos con nosotros, por eso pensamos ¿por qué no usamos las funcionalidades que vienen en los teléfonos? como las billeteras (wallets, que son comúnmente utilizadas para llevar tickets de avión, entradas de conciertos o cupones) o al menos cambiar el formato del certificado a una versión horizontal como la pantalla del celular.
            </div>
            <div className='font-light border-1 text-justify'>
              Es ahi cuando nos reunimos los tres y comenzamos a trabajar en esta solución que haga ambas cosas. Guardar el certificado en tu billetera móvil y crear un formato horizontal del certificado, amigable, ecológico y funcional.
            </div>

            <div className='text-primary font-black'>
              Equipo de Desarrollo
            </div>
            <div className='font-light text-justify'>
              <ul className='px-4 list-disc list-inside'>
                <li>Gary Ascuy ( @garyascuy )</li>
                <li>Rodrigo Ergueta ( @rodrigoergueta )</li>
                <li>Ramiro Ergueta ( @ramiroergueta )</li>
              </ul>
            </div>
          </div>

          <Footer></Footer>
        </div>
      </main>
    </div>
  )
}

export default About
