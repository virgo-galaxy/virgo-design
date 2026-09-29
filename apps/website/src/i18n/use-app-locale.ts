import { useTranslation } from 'react-i18next';

import { type AppLocale, normalizeAppLocale } from './locale';

export function useAppLocale(): AppLocale {
  const { i18n } = useTranslation();

  return normalizeAppLocale(i18n.resolvedLanguage ?? i18n.language);
}
