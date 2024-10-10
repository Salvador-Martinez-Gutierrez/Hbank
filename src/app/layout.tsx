import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HBANK',
  description: 'The All-in-One Hub for Hedera Investors',
  icons: {
    icon: '/favicon.png'
  }
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <NavBar />
          {children}
          <Footer />
          <Analytics />
      </body>
    </html>
  )
}

/*
import SideNav from './components/SideNav'

interface LayoutProps {
  children: React.ReactNode
  params: {
    accountId: string
  }
}

export default function Layout ({ children, params }: LayoutProps) {
  return (
    <div className="flex flex-col md:flex-row">
      <SideNav accountId={params.accountId} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
*/
