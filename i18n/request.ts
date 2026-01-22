import { getRequestConfig, getLocale as getLocaleIntl, getMessages as getMessagesIntl } from 'next-intl/server'
import en from '../messages/en.json'
import he from '../messages/he.json'

export const locales = ['en', 'he'] as const
export type Locale = typeof locales[number]

export const getLocale = getLocaleIntl
export const getMessages = getMessagesIntl

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en'

  return {
    locale: validLocale,
    messages: validLocale === 'he' ? he : en
  }
})