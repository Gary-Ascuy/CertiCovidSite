import type { NextPage } from 'next'
import Head from 'next/head'

import Metadata from '../lib/components/Metadata'
import Seo from '../lib/components/Seo'
import Header from '../lib/components/Header'
import Footer from '../lib/components/Footer'

const Home: NextPage = () => {

  return (
    <div className='md:w-2/3 xl:w-2/5 md:mx-auto flex flex-col min-h-screen justify-center px-5 py-12'>
      <Head>
        <Metadata></Metadata>
      </Head>
      <Seo />

      <main className='flex flex-col space-y-2'>
        <Header></Header>
        <Home></Home>
        <Footer></Footer>
      </main>
    </div>
  )
}

export default Home
