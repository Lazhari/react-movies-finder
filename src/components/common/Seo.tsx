import React from 'react'
import Head from 'next/head'

interface Props {
  title: string
  siteTitle?: string
  description: string
}

const SEO: React.FC<Props> = ({
  description,
  title,
  siteTitle = 'Movies Finder',
}) => {
  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta
        property="twitter:site"
        content="https://react-movies-finder.vercel.app/"
      />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Head>
  )
}

export default SEO
