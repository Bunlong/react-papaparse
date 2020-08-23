import React from 'react'
import Head from 'next/head'
import App from 'next/app'

import 'react-tabs/style/react-tabs.css'

class CustomApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props
    const pageName = this.props.router.route.substr(1)
    let title = ''
    if (pageName === '') {
      title = 'react-papaparse'
    } else if (pageName === 'demo') {
      title = 'Demo'
    } else if (pageName === 'docs') {
      title = 'Documentation'
    }
    return (
      <div>
        <Head>
          <title> {`${title} - Powerful CSV Parser for React`}</title>
          <link rel='shortcut icon' type='image/x-icon' href='' />
          <meta name='theme-color' content='#ffffff' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black' />
          <meta name='apple-mobile-web-app-title' content='react-papaparse' />
          <link rel='apple-touch-icon' href='' />
          <link rel='shortcut icon' type='image/x-icon' href='' />

          <link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css' />
          <link rel='stylesheet' href='//fonts.googleapis.com/css?family=Arvo|Source+Sans+Pro:400,400italic,700|Lato:300,400' />
          <link rel='stylesheet' href='/static/css/unsemantic.css' />
          <link rel='stylesheet' href='/static/css/common.css' />
          <link rel='stylesheet' href='/static/css/prism.css' />

          {pageName === '' ? <link rel='stylesheet' href='/static/css/home.css' /> : ''}
          {pageName === 'demo' ? <link rel='stylesheet' href='/static/css/demo.css' /> : ''}

          <meta property='og:url' content='https://react-papaparse.github.io' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='react-papaparse' />
          <meta property='og:description' content='The fastest in-browser CSV (or delimited text) parser for React.' />
          <meta property='og:image' content='/static/images/react-papaparse.png' />

          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@bunlongvan' />
          <meta name='twitter:creator' content='@bunlongvan' />
          <meta name='twitter:title' content='react-papaparse' />
          <meta name='twitter:description' content='The fastest in-browser CSV (or delimited text) parser for React.' />
          <meta name='twitter:image' content='https://react-papaparse.github.io/static/images/react-papaparse.png' />

          <link rel='shortcut icon' href='/static/favicon.ico' type='image/x-icon' />
          <link rel='icon' href='/static/favicon-32.png' sizes='32x32' type='image/png' />
          <link rel='apple-touch-icon-precomposed' href='/static/favicon-152.png' type='image/png' sizes='152x152' />
          <link rel='apple-touch-icon-precomposed' href='/static/favicon-120.png' type='image/png' sizes='120x120' />
          <link rel='icon' href='/static/favicon-96.png' sizes='96x96' type='image/png' />
        </Head>
        <div>
          <Component {...pageProps} />
        </div>
        <footer>
          <div className='footer-main'>
            <div className='grid-container'>
              <div className='grid-40 text-center'>
                <div className='logo' />
                <br /><br />
                react-papaparse by <a href='https://github.com/bunlong'>Bunlong</a>
                <br />
                &copy; 2018-2020
              </div>

              <div className='grid-15 mobile-grid-50 links'>
                <h5>Learn</h5>
                <a href='/demo'>Demo</a>
                <a href='/docs'>Documentation</a>
              </div>

              <div className='grid-15 mobile-grid-50 links'>
                <h5>Project</h5>
                <a href='https://github.com/Bunlong/react-papaparse' target="_blank">react-papaparse</a>
                <a href='https://github.com/Bunlong/next-share' target="_blank">next-share</a>
                <a href='https://github.com/Bunlong/react-webspeech' target="_blank">react-webspeech</a>
                <a href='https://github.com/Bunlong/react-barcodes' target="_blank">react-barcodes</a>
                <a href='https://github.com/Bunlong/react-qrcodes' target="_blank">react-qrcodes</a>
              </div>
            </div>
          </div>
        </footer>
        <script type='text/javascript' src='/static/js/prism.js' />
      </div>
    )
  }
}

export default CustomApp
