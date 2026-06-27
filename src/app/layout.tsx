import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { CartProvider } from '@/components/cart-provider'
import { CartDrawer } from '@/components/cart-drawer'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://plugged.market'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PLUGGED — Underground Fashion Supplier Bundles',
    template: '%s — PLUGGED',
  },
  description:
    'Vetted supplier bundles for young fashion resellers — Opium, Y2K, UK drip, gorpcore, sneakers and 14+ aesthetics. $20 lifetime access.',
  generator: 'v0.app',
  keywords: [
    'streetwear suppliers',
    'opium fashion',
    'y2k bundle',
    'uk drip',
    'gorpcore',
    'gymwear reselling',
    'sneaker suppliers',
    'reseller plugs',
  ],
  openGraph: {
    type: 'website',
    siteName: 'PLUGGED.',
    title: 'PLUGGED — Underground Fashion Supplier Bundles',
    description:
      '14 style bundles for young resellers — Opium, Y2K, UK drip, sneakers and more. Vetted plugs, instant access.',
    url: SITE_URL,
    images: [{ url: '/logo.svg', width: 1200, height: 630, alt: 'PLUGGED.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PLUGGED — Underground Fashion Supplier Bundles',
    description:
      '14 style bundles for young resellers. Vetted supplier links, instant vault access.',
    images: ['/logo.svg'],
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${inter.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
          <Toaster
            theme="dark"
            position="bottom-right"
            visibleToasts={1}
            closeButton
            toastOptions={{
              classNames: {
                toast:
                  'border border-border bg-card/95 text-foreground backdrop-blur-xl',
                description: 'text-muted-foreground',
                actionButton: 'bg-accent text-accent-foreground',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  )
}
