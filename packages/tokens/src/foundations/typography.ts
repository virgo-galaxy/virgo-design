import { monoFonts, sansFonts } from '@virgo-design/fonts';

const sansFallback = 'system-ui, sans-serif';
const monoFallback = 'ui-monospace, monospace';

export const fontFamily = {
  sans: `${sansFonts.inter.cssFamily}, ${sansFallback}`,
  mono: `${monoFonts.jetbrainsMono.cssFamily}, ${monoFallback}`,
} as const;

export const fontFamilyRole = {
  sans: {
    name: sansFonts.inter.name,
    family: fontFamily.sans,
  },
  mono: {
    name: monoFonts.jetbrainsMono.name,
    family: fontFamily.mono,
  },
} as const;

/** Locale-aware sans roles for Virgo Design. */
export const internationalSans = {
  latin: {
    locale: 'en',
    name: sansFonts.inter.name,
    family: fontFamily.sans,
  },
  zhHans: {
    locale: 'zh-Hans',
    name: sansFonts.notoSansSC.name,
    family: `${sansFonts.inter.cssFamily}, ${sansFonts.notoSansSC.cssFamily}, ${sansFallback}`,
  },
  zhHantTW: {
    locale: 'zh-Hant-TW',
    name: sansFonts.notoSansTC.name,
    family: `${sansFonts.inter.cssFamily}, ${sansFonts.notoSansTC.cssFamily}, ${sansFallback}`,
  },
  zhHantHK: {
    locale: 'zh-Hant-HK',
    name: sansFonts.notoSansHK.name,
    family: `${sansFonts.inter.cssFamily}, ${sansFonts.notoSansHK.cssFamily}, ${sansFallback}`,
  },
  ja: {
    locale: 'ja',
    name: sansFonts.notoSansJP.name,
    family: `${sansFonts.inter.cssFamily}, ${sansFonts.notoSansJP.cssFamily}, ${sansFallback}`,
  },
  ko: {
    locale: 'ko',
    name: sansFonts.notoSansKR.name,
    family: `${sansFonts.inter.cssFamily}, ${sansFonts.notoSansKR.cssFamily}, ${sansFallback}`,
  },
} as const;

export const internationalSansOrder = [
  'latin',
  'zhHans',
  'zhHantTW',
  'zhHantHK',
  'ja',
  'ko',
] as const satisfies readonly (keyof typeof internationalSans)[];

export const sansLocaleMapping = {
  en: 'latin',
  'en-US': 'latin',
  'en-GB': 'latin',
  'zh-Hans': 'zhHans',
  'zh-CN': 'zhHans',
  'zh-SG': 'zhHans',
  'zh-Hant': 'zhHantTW',
  'zh-Hant-TW': 'zhHantTW',
  'zh-TW': 'zhHantTW',
  'zh-Hant-HK': 'zhHantHK',
  'zh-HK': 'zhHantHK',
  ja: 'ja',
  'ja-JP': 'ja',
  ko: 'ko',
  'ko-KR': 'ko',
} as const satisfies Record<string, keyof typeof internationalSans>;

export const fontSize = {
  10: '10px',
  11: '11px',
  12: '12px',
  13: '13px',
  14: '14px',
  16: '16px',
  20: '20px',
  24: '24px',
  28: '28px',
  32: '32px',
  40: '40px',
  48: '48px',
  56: '56px',
  64: '64px',
} as const;

export const fontWeight = {
  400: 400,
  500: 500,
  600: 600,
  700: 700,
} as const;

export const lineHeight = {
  1: 1.1,
  2: 1.25,
  3: 1.4,
  4: 1.6,
} as const;

export type FontFamilyToken = keyof typeof fontFamily;
export type FontFamilyRole = keyof typeof fontFamilyRole;
export type InternationalSansId = keyof typeof internationalSans;
export type SansLocale = keyof typeof sansLocaleMapping;
export type FontSizeToken = keyof typeof fontSize;
export type FontWeightToken = keyof typeof fontWeight;
export type LineHeightToken = keyof typeof lineHeight;

export const letterSpacing = { normal: 'normal', tight: '-0.02em', wide: '0.02em' } as const;
export type LetterSpacingToken = keyof typeof letterSpacing;
