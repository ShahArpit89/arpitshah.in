import type { Metadata } from 'next'
import { instrumentSerif, karla, fragmentMono } from '@/lib/fonts'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arpit Shah',
  description: 'Software engineer (AI-focused) and wildlife photographer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${karla.variable} ${fragmentMono.variable}`}
    >
      <body>
        <div className="mx-auto max-w-5xl px-6">
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
