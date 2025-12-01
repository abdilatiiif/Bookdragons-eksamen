import React from 'react'
import './styles.css'
import { Navigation } from '@/components/navigation/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Bookdragons',
  description: 'Nettbutikk for Bookdragons, Online bokhandel',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="no">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
