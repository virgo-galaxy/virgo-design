import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from './locales/en';
import { zhCN } from './locales/zh-CN';

export type AppLocale = 'en' | 'zh-CN';

const STORAGE_KEY = 'virgo-design-locale';

function getInitialLocale(): AppLocale {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  return stored === 'zh-CN' ? 'zh-CN' : 'en';
}

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    'zh-CN': {
      translation: zhCN,
    },
  },
  lng: getInitialLocale(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export function setAppLocale(locale: AppLocale) {
  window.localStorage.setItem(STORAGE_KEY, locale);
  return i18n.changeLanguage(locale);
}

export default i18n;
