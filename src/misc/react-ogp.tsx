import React from 'react'
import { OGP } from 'react-ogp'
import { Helmet as Head } from 'react-helmet'

export default function OGPHead() {
  return (
    <>
      <Head>
      <title>JackHenryWelsh.com</title>
      <meta name="description" content="A Personal Website" />
      <link rel="apple-touch-icon" href="/logo512.png" />
        <OGP
          url="https://jackhenrywelsh.com"
          title="JackHenryWelsh.com"
          description="A Personal Website"
          siteName="JackHenryWelsh.com"
          image="/logo512.png"
        />
      </Head>
    </>
  )
}