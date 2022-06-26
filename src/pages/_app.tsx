/* eslint-disable @next/next/no-page-custom-font */
import useNProgress from '@nexys/hooks/useNProgress/useNProgress'
import useRefreshStyle from '@nexys/hooks/useRefreshStyle/useRefreshStyle'
import '@nexys/styles/global.scss'
import getSiteLayout from 'layouts/core/DefaultLayout'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'styles/sass/main.scss'
// import useLoadingPage from 'hooks/useLoadingPage/useLoadingPage'

const brand = process.env.BRAND ?? 'Your Brand'

const title = brand
const description = `${brand} - your description brand`
const metaURL = 'https://example.com'
const metaImage = '/static/logo.png'
const webIconURL = '/static/favicon.ico'

function App(props: AppProps) {
  useNProgress()
  useRefreshStyle()
  // const loading = useLoadingPage()
  const siteLayout = getSiteLayout(props)

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <link rel="icon" href={webIconURL} />
        <meta name="description" content={description} />

        {/* meta facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaURL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={metaImage} />

        {/* meta twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metaURL} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={metaImage} />

        {/* tema website */}
        <meta name="theme-color" content="#209eee" />
        <link rel="icon" type="image/png" sizes="16x16" href={webIconURL} />
        <link rel="icon" type="image/png" sizes="32x32" href={webIconURL} />
        <link rel="icon" type="image/png" sizes="96x96" href={webIconURL} />
        <link rel="icon" type="image/png" sizes="192x192" href={webIconURL} />

        {/* <script type="application/ld+json"> */}
        {/*  {JSON.stringify(schemaORG)} */}
        {/* </script> */}
      </Head>

      {/* {loading} */}
      {siteLayout}
    </React.Fragment>
  )
}

export default App
