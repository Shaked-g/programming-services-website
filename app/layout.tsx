import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Noto_Sans_Hebrew } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { VisitorTracker } from "@/components/visitor-tracker"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from '@/i18n/request'
import { headers } from 'next/headers'
import en from '../messages/en.json'
import he from '../messages/he.json'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })
const notoSansHebrew = Noto_Sans_Hebrew({ subsets: ["hebrew"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://academicassist.org"),
  title: "Academic Assist | Professional Assignment Help Services",
  description:
    "Expert academic assistance across disciplines. Programming assignments, humanities research, social work projects, and multi-disciplinary studies. Get help from subject matter experts.",
  keywords: [
    "assignment help",
    "academic assistance",
    "programming help",
    "research papers",
    "homework help",
    "tutoring",
  ],
  openGraph: {
    type: "website",
    url: "https://academicassist.org",
    siteName: "Academic Assist",
    title: "Academic Assist | Professional Assignment Help Services",
    description:
      "Expert academic assistance across disciplines. Programming assignments, humanities research, social work projects, and multi-disciplinary studies.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Academic Assist - Professional Assignment Help Services",
      },
    ],
    locale: "he_IL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academic Assist | Professional Assignment Help Services",
    description:
      "Expert academic assistance across disciplines. Programming assignments, humanities research, social work projects, and multi-disciplinary studies.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://academicassist.org",
  },
  generator: 'v0.app'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  const detectedLocale = headersList.get('x-detected-locale') || 'he'
  const locale = detectedLocale

  const messages = locale === 'he' ? he : en

  const isRTL = locale === 'he'

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`font-sans antialiased ${isRTL ? notoSansHebrew.className : inter.className}`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
            <VisitorTracker />
            <WhatsAppButton />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
