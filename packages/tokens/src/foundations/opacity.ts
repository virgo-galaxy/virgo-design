export const opacity = {
  100: 1,
  80: 0.8,
  64: 0.64,
  48: 0.48,
  32: 0.32,
  16: 0.16,
  8: 0.08,
} as const;

export type OpacityToken = keyof typeof opacity;
