export const fontFamily = {
  sans: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Helvetica, Arial, sans-serif',
  mono: 'ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace',
} as const;

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
export type FontSizeToken = keyof typeof fontSize;
export type FontWeightToken = keyof typeof fontWeight;
export type LineHeightToken = keyof typeof lineHeight;
export type LetterSpacingToken = keyof typeof letterSpacing;
