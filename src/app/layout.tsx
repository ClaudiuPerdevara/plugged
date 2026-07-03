import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/cart-provider'
import { CartDrawer } from '@/components/cart-drawer'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
    'Vetted supplier bundles for young fashion resellers — Opium, Y2K, racing, Carhartt workwear, vintage sportswear and more aesthetics. Lifetime access from €7.',
  generator: 'PLUGGED',
  keywords: [
    'streetwear suppliers',
    'opium fashion',
    'y2k bundle',
    'uk drip',
    'carhartt workwear',
    'vintage sportswear reselling',
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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
      <head>
        {/* TikTok Pixel */}
        <Script id="tiktok-pixel" strategy="beforeInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('D93U103C77U133LMI4SG');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      </head>
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
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
