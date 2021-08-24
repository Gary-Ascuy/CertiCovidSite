import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Header from '../lib/components/Header'
import Metadata from '../lib/components/Metadata'
import Seo from '../lib/components/Seo'

const TermsOfService: NextPage = () => {
  return (
    <div className='md:w-2/3 xl:w-2/5 md:mx-auto flex flex-col min-h-screen justify-center px-5 py-12'>
      <Head><Metadata title='CertiCovid - Terms of Service'></Metadata></Head>
      <Seo title='CertiCovid - Terms of Service' description='CertiCovid - Terms of Service' />

      <main className='flex flex-col space-y-2'>
        <Header title='CertiCovid - Terms of Service'></Header>

        <div className="flex flex-col space-y-5">
          <div className='rounded-md p-6 bg-gray-100 space-y-4 font-light'>
            <p>
              Digitaliza tu Certificado de Vacunación con <span className='font-black text-primary'>CertiCovid</span>, añade tu certificado de vacunación a tus aplicaciones de billetera favoritas. En iOS, utiliza el navegador Safari.
              Términos y Condiciones   Tenga en cuenta que no somos los emisores de los certificados originales y no estamos conectados de ninguna manera con las autoridades oficiales del Gobierno ni los representamos de ninguna manera. Estamos transfiriendo toda la información que figura y contiene el Carnet de Vacunación COVID-19 emitido por el Ministerio de Salud y Deportes del Estado Plurinacional de Bolivia y el mismo código QR de validación de su certificado original en papel/PDF al formato digital, y la funcionalidad se ha probado con todas las aplicaciones de validación disponibles en el momento del desarrollo.  Se aclara que el uso de la imagen de Gobierno y el Imagotipo en la aplicación, se atribuye al uso original por parte del Ministerio de Salud y Deportes del Estado Plurinacional de Bolivia al transferirse toda la información y contenido del Carnet de Vacunación COVID-19, emitido por ese Ministerio.  CertiCovid no reemplaza el Certificado emitido por el Ministerio de Salud, solo lo digitaliza. Le recomendamos encarecidamente que tenga a mano su certificado original y busque activamente la información y las medidas más recientes del uso del certificado en el Pais.  Politica de Privacidad   No recopilamos ningún dato de contacto, sólo datos almacenados en su código QR.   Información general  - Tus datos no se almacenan más allá de la sesión activa del navegador y el sitio no utiliza cookies. - No se envían datos a terceros. - Transmitimos sus datos de forma segura a través de https. - Nuestro servidor está alojado en Vercel. - El código fuente de este sitio está disponible en GitHub. - Por defecto, los pases de Apple Wallet son accesibles desde la pantalla de bloqueo. Esto se puede cambiar en los ajustes.  Explicación resumida del proceso  Los siguientes pasos ocurren al escanear su código QR.  - Reconocimiento y extracción de los datos del código QR de su certificado seleccionado.  - Recabar la información de los datos publicados en el QR desde la pagina del Ministerio de Salud.  - Generar un archivo PKPass compatible con AppleWallet (en iOS) y WalletPasses (en Android) y una vista previa en formato amigable (diseño vertical) para el celular si desean tomar una captura de pantalla.   - Guardar el archivo en su dispositivo  CertiCovid ofrece este certificado digital a usted, el usuario, con la condición de que acepte todos los términos, condiciones, políticas y avisos aquí expuestos. CertiCovid se reserva el derecho a realizar cambios en estos términos y condiciones de forma inmediata, publicando los cambios en este lugar.  Utilice el certificado bajo su propia responsabilidad. Este certificado se le proporciona "tal cual" sin garantía de ningún tipo, ni expresa ni implícita. Ni CertiCovid ni sus empleados, agentes, proveedores de información de terceros, comerciantes, otorgantes de licencias o similares garantizan que el pase o su funcionamiento sea preciso, fiable, ininterrumpido o libre de errores. Ningún agente o representante tiene autoridad para crear ninguna garantía con respecto al certificado en nombre de CertiCovid. CertiCovid se reserva el derecho de cambiar o interrumpir en cualquier momento cualquier aspecto o característica del pase.  Terceros vinculados - GitHub:   - Ko-Fi - Apple puede sincronizar sus pases a través de iCloud
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TermsOfService
