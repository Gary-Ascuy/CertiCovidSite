import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import Metadata from '../lib/components/Metadata'
import Seo from '../lib/components/Seo'
import Header from '../lib/components/Header'

const About: NextPage = () => {
  return (
    <div className='md:w-2/3 xl:w-2/5 md:mx-auto flex flex-col min-h-screen justify-center px-5 py-12'>
      <Head><Metadata title='CertiCovid - About'></Metadata></Head>
      <Seo title='CertiCovid - About' description='CertiCovid - About' />

      <main className='flex flex-col space-y-2'>
        <Header title='About' className='text-3xl'></Header>

        <div className='flex flex-col space-y-5'>
          <div className='rounded-md p-6 bg-gray-100 space-y-4 font-light'>
            About
          </div>
        </div>
      </main>
    </div>
  )
}

export default About
