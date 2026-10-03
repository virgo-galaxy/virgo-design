import { useTranslation } from 'react-i18next';

import { type AppLocale, normalizeAppLocale } from './locale';
import { getLocalePreference, subscribeLocalePreference } from './runtime';

export function useAppLocalePreference() {
  return useSyncExternalStore(subscribeLocalePreference, getLocalePreference, getLocalePreference);
}

export function useAppLocale(): AppLocale {
  const { i18n } = useTranslation();

  return normalizeAppLocale(i18n.resolvedLanguage ?? i18n.language);
}
import { useSyncExternalStore } from 'react';
