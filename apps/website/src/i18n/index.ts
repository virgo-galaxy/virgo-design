import { internationalSans, sansLocaleMapping } from '@virgo-design/tokens';
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

export function getLocaleFontFamily(locale: AppLocale) {
  const familyId = sansLocaleMapping[locale];

  return internationalSans[familyId].family;
}

function applyDocumentLocale(locale: AppLocale) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.lang = locale;
  document.documentElement.style.setProperty('--app-font-family', getLocaleFontFamily(locale));
}

const initialLocale = getInitialLocale();

applyDocumentLocale(initialLocale);

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    'zh-CN': {
      translation: zhCN,
    },
  },
  lng: initialLocale,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (language) => {
  applyDocumentLocale(language === 'zh-CN' ? 'zh-CN' : 'en');
});

export function setAppLocale(locale: AppLocale) {
  window.localStorage.setItem(STORAGE_KEY, locale);
  return i18n.changeLanguage(locale);
}

export default i18n;
