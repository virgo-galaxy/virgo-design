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
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
  '2xl': '20px',
  '3xl': '24px',
  '4xl': '28px',
  '5xl': '32px',
  '6xl': '40px',
  '7xl': '48px',
  '8xl': '64px',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export const lineHeight = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.4,
  relaxed: 1.6,
} as const;

export const letterSpacing = {
  tighter: '-0.03em',
  tight: '-0.02em',
  snug: '-0.01em',
  normal: '0',
  wide: '0.01em',
  wider: '0.02em',
} as const;

export type FontFamilyToken = keyof typeof fontFamily;
export type FontFamilyRole = keyof typeof fontFamilyRole;
export type InternationalSansId = keyof typeof internationalSans;
export type SansLocale = keyof typeof sansLocaleMapping;
export type FontSizeToken = keyof typeof fontSize;
export type FontWeightToken = keyof typeof fontWeight;
export type LineHeightToken = keyof typeof lineHeight;
export type LetterSpacingToken = keyof typeof letterSpacing;
