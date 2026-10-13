import { internationalSans, sansLocaleMapping } from '@virgo-design/tokens';

export type AppLocale = 'en-US' | 'zh-CN';
export type LocalePreference = 'auto' | AppLocale;

export function resolveAppLocale(
  preference: LocalePreference,
  languages: readonly string[],
): AppLocale {
  if (preference !== 'auto') return preference;
  for (const language of languages) {
    const code = language.toLowerCase().split(/[-_]/)[0];
    if (code === 'zh') return 'zh-CN';
    if (code === 'en') return 'en-US';
  }
  return 'en-US';
}
export function normalizeAppLocale(language: string | null | undefined): AppLocale {
  return language === 'zh-CN' ? 'zh-CN' : 'en-US';
}
export function getLocaleFontFamily(locale: AppLocale) {
  return internationalSans[sansLocaleMapping[locale]].family;
}
