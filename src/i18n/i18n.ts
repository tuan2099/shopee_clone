// đa ngôn ngũ
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

const resources = {
  en: {
    //namespace
    translation: {
      'all categories': 'All categories'
    }
  },
  vi: {
    translation: {
      'all categories': 'Tất cả danh mục'
    }
  }
}

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})
