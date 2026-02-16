import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pdf-editor.vercel.app'),
  title: 'Professional PDF Editor - Free Online PDF Annotation Tool',
  description: 'Edit, annotate, and customize your PDF documents with powerful tools. Add text, shapes, drawings, and highlights to your PDFs. No installation required.',
  keywords: 'PDF editor, PDF annotation, PDF markup, online PDF tool, PDF text editor, PDF highlighter',
  authors: [{ name: 'PDF Editor Team' }],
  creator: 'PDF Editor',
  alternates: {
    canonical: 'https://pdf-editor.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pdf-editor.vercel.app',
    siteName: 'Professional PDF Editor',
    title: 'Professional PDF Editor - Free Online PDF Annotation Tool',
    description: 'Edit, annotate, and customize your PDF documents with powerful tools. Add text, shapes, drawings, and highlights.',
    images: [
      {
        url: 'https://pdf-editor.vercel.app/api/og',
        width: 1200,
        height: 630,
        alt: 'Professional PDF Editor - Edit and Annotate PDFs Online',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional PDF Editor - Free Online PDF Annotation Tool',
    description: 'Edit, annotate, and customize your PDF documents with powerful tools.',
    images: ['https://pdf-editor.vercel.app/api/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Professional PDF Editor',
    'description': 'Edit, annotate, and customize your PDF documents with powerful tools. Add text, shapes, drawings, and highlights.',
    'url': 'https://pdf-editor.vercel.app',
    'applicationCategory': 'Productivity',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'creator': {
      '@type': 'Organization',
      'name': 'PDF Editor Team',
    },
    'featureList': [
      'Add text to PDF',
      'Draw on PDF documents',
      'Add shapes (rectangles and circles)',
      'Highlight PDF content',
      'Edit multiple pages',
      'Zoom controls',
      'Color customization',
      'Download edited PDF',
    ],
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  )
}
