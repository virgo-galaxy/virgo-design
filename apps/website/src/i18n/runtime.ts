import i18nInstance from 'i18next';
import { initReactI18next } from 'react-i18next';

import { type AppLocale, getLocaleFontFamily, normalizeAppLocale } from './locale';
import { enUS, zhCN } from './registry';

const STORAGE_KEY = 'virgo-design-locale';
const defaultLocale = normalizeAppLocale(
  typeof document === 'undefined' ? undefined : document.documentElement.lang,
);

function getInitialLocale(): AppLocale {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    return saved === 'en-US' || saved === 'zh-CN' ? saved : defaultLocale;
  } catch {
    return defaultLocale;
  }
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

void i18nInstance.use(initReactI18next).init({
  resources: {
    'en-US': {
      translation: enUS,
    },
    'zh-CN': {
      translation: zhCN,
    },
  },
  lng: initialLocale,
  fallbackLng: 'en-US',
  returnNull: false,
  interpolation: {
    escapeValue: false,
  },
});

i18nInstance.on('languageChanged', (language) => {
  applyDocumentLocale(normalizeAppLocale(language));
});

export function setAppLocale(locale: AppLocale) {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Language switching remains available when browser storage is denied.
    }
  }

  return i18nInstance.changeLanguage(locale);
}

export { i18nInstance };
