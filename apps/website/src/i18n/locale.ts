import { internationalSans, sansLocaleMapping } from '@virgo-design/tokens';

export type AppLocale = 'en-US' | 'zh-CN';

export function normalizeAppLocale(language: string | null | undefined): AppLocale {
  return language === 'zh-CN' ? 'zh-CN' : 'en-US';
}

export function getLocaleFontFamily(locale: AppLocale) {
  const familyId = sansLocaleMapping[locale];

  return internationalSans[familyId].family;
}
