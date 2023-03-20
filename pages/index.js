import Head from 'next/head'
import Link from 'next/link'

// Main Nav component - include this in Layout component
// User Icon Component - link to user-profile page
// Search Icon component - filter component
// Favorites Icon component - link to favorites page
// Button component

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black text-white">
        Welcome to Ghost Quest!
        <Link href={'/locations'}>Click Here</Link>
      </div>
    </div>
  )
}
