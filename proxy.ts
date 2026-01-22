import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n/request'
import { NextResponse } from 'next/server'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always'
})

export default function middleware(request: any) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname

  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/(en|he)/)
  const detectedLocale = localeMatch ? localeMatch[1] : 'en'

  // Run the intl middleware
  const response = intlMiddleware(request)

  // Add custom header with detected locale
  if (response) {
    response.headers.set('x-detected-locale', detectedLocale)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}