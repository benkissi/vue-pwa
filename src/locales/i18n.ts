import { createI18n } from 'vue-i18n'

import en from './en.json'
import fr from './fr.json'

export type IEnLocale = typeof en

const i18n = createI18n<[IEnLocale], 'en' | 'fr'>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: en,
    fr: fr
  }
})

export default i18n
