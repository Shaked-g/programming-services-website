import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Noto_Sans_Hebrew } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
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
    generator: 'v0.app'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  const detectedLocale = headersList.get('x-detected-locale') || 'en'
  const locale = detectedLocale

  const messages = locale === 'he' ? he : en

  const isRTL = locale === 'he'

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`font-sans antialiased ${isRTL ? notoSansHebrew.className : inter.className}`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
