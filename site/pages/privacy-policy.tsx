import type { NextPage } from 'next'
import Head from 'next/head'

import Header from '../lib/components/Header'
import Metadata from '../lib/components/Metadata'
import Seo from '../lib/components/Seo'

const PrivacyPolicy: NextPage = () => {
  return (
    <div className='md:w-2/3 xl:w-2/5 md:mx-auto flex flex-col min-h-screen justify-center px-5 py-12'>
      <Head><Metadata title='CertiCovid - Política de Privacidad'></Metadata></Head>
      <Seo title='CertiCovid - Política de Privacidad' description='CertiCovid - Política de Privacidad' />

      <main className='flex flex-col space-y-2'>
        <Header title='Política de Privacidad' className='text-3xl'></Header>

        <div className='flex flex-col space-y-5'>
          <div className='rounded-md p-6 bg-gray-100 space-y-4 font-light'>
            <p className='p-2 text-justify'>
              No recopilamos ningún dato de contacto, sólo datos almacenados en su código QR.
            </p>

            <p className='p-2 text-xl text-justify font-black text-primary'>
              Información general
            </p>

            <p className='p-2 text-justify'>
              <ul className='px-4 list-disc list-inside'>
                <li>Tus datos no se almacenan más allá de la sesión activa del navegador y el sitio no utiliza cookies.</li>
                <li>No se envían datos a terceros.</li>
                <li>Transmitimos sus datos de forma segura a través de https.</li>
                <li>Nuestro servidor está alojado en Vercel.</li>
                <li>El código fuente de este sitio está disponible en GitHub.</li>
                <li>Por defecto, los pases de Apple Wallet son accesibles desde la pantalla de bloqueo. Esto se puede cambiar en los ajustes.</li>
              </ul>
            </p>

            <p className='px-2 text-xl text-justify font-black text-primary'>
              Explicación resumida del proceso
            </p>
            <p className='px-2 text-justify'>Los siguientes pasos ocurren al escanear su código QR.</p>

            <p className='p-2 text-justify'>
              <ul className='px-4 list-disc list-inside'>
                <li>Reconocimiento y extracción de los datos del código QR de su certificado seleccionado</li>
                <li>Recabar la información de los datos publicados en el QR desde la pagina del Ministerio de Salud</li>
                <li>Generar un archivo PKPass compatible con AppleWallet (en iOS) y WalletPasses (en Android) y una vista previa en formato amigable (diseño vertical) para el celular si desean tomar una captura de pantalla o descargar el documento el formato PDF</li>
                <li>Guardar el archivo en su dispositivo</li>
              </ul>
            </p>

            <p className='p-2 text-justify'>
              <span className='font-black text-primary'>CertiCovid</span> ofrece este certificado digital a usted, el usuario, con la condición de que acepte todos los términos, condiciones, políticas y avisos aquí expuestos. <span className='font-black text-primary'>CertiCovid</span> se reserva el derecho a realizar cambios en estos términos y condiciones de forma inmediata, publicando los cambios en este lugar.
            </p>

            <p className='p-2 text-justify'>
              Utilice el certificado bajo su propia responsabilidad. Este certificado se le proporciona &ldquo;tal cual&rdquo; sin garantía de ningún tipo, ni expresa ni implícita. Ni <span className='font-black text-primary'>CertiCovid</span> ni sus empleados, agentes, proveedores de información de terceros, comerciantes, otorgantes de licencias o similares garantizan que el pase o su funcionamiento sea preciso, fiable, ininterrumpido o libre de errores. Ningún agente o representante tiene autoridad para crear ninguna garantía con respecto al certificado en nombre de CertiCovid. CertiCovid se reserva el derecho de cambiar o interrumpir en cualquier momento cualquier aspecto o característica del pase.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PrivacyPolicy
