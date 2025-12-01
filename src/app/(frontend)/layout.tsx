import React from 'react'
import './styles.css'
import { Navigation } from '@/components/navigation/Navigation'

export const metadata = {
  description: 'Nettbutikk for Bookdragons, Online bokhandel',
  title: 'Bookdragons',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="no">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
