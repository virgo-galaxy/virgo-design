import { createInstance, type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { localStorageAccess } from '@/lib/storage';

import {
  type AppLocale,
  getLocaleFontFamily,
  type LocalePreference,
  normalizeAppLocale,
  resolveAppLocale,
} from './locale';

export const localeStorageKey = 'virgo-pro:locale:v1';
function getInitialPreference(): LocalePreference {
  const saved = localStorageAccess.get(localeStorageKey).value;
  return saved === 'auto' || saved === 'zh-CN' ? saved : 'en-US';
}
function detectedLocale(preference: LocalePreference): AppLocale {
  return resolveAppLocale(
    preference,
    typeof navigator === 'undefined' ? [] : [...navigator.languages, navigator.language],
  );
}
let localePreference = getInitialPreference();
const preferenceListeners = new Set<() => void>();
export const getLocalePreference = () => localePreference;
export function subscribeLocalePreference(listener: () => void) {
  preferenceListeners.add(listener);
  return () => {
    preferenceListeners.delete(listener);
  };
}
function applyDocumentLocale(locale: AppLocale) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = locale;
  document.documentElement.style.setProperty('--app-font-family', getLocaleFontFamily(locale));
}
export const i18nInstance = createInstance();
const initialLocale = detectedLocale(localePreference);
applyDocumentLocale(initialLocale);
export function initializeI18n(resources: Resource) {
  return i18nInstance.use(initReactI18next).init({
    resources,
    lng: initialLocale,
    fallbackLng: 'en-US',
    returnNull: false,
    interpolation: { escapeValue: false },
  });
}
i18nInstance.on('languageChanged', (language) => {
  applyDocumentLocale(normalizeAppLocale(language));
});
export function setAppLocale(locale: AppLocale) {
  return setAppLocalePreference(locale);
}
export function setAppLocalePreference(preference: LocalePreference) {
  localePreference = preference;
  localStorageAccess.set(localeStorageKey, preference);
  for (const listener of preferenceListeners) listener();
  return i18nInstance.changeLanguage(detectedLocale(preference));
}
export function resetAppLocale() {
  localePreference = 'en-US';
  for (const listener of preferenceListeners) listener();
  return i18nInstance.changeLanguage('en-US');
}
function onBrowserLanguageChange() {
  if (localePreference === 'auto') void i18nInstance.changeLanguage(detectedLocale('auto'));
}
if (typeof window !== 'undefined') {
  window.addEventListener('languagechange', onBrowserLanguageChange);
  import.meta.hot?.dispose(() =>
    window.removeEventListener('languagechange', onBrowserLanguageChange),
  );
}
