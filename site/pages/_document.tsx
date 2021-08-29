import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CertiCovidDocument extends Document {
  render() {
    return (
      <Html lang='es'>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />

          {/* Ko-fi Button */}
          <script async type='text/javascript' src='https://storage.ko-fi.com/cdn/widget/Widget_2.js' />
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* Ko-fi Button */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              kofiwidget2.init("Buy Us a Coffee", "#29abe0", "E1E25YVX9");
              kofiwidget2.draw();
            `,
            }}
          />
        </body>
      </Html>
    )
  }
}
