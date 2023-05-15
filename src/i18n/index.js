import { createI18n } from 'vue-i18n'
import de from './de'
import en from './en'

export default createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') ? localStorage.getItem('locale').toLowerCase() : navigator.language != null ? navigator.language.split('-')[0] : 'en',
  fallbackLocale: 'en',
  messages: {
    de,
    en
  }
})
