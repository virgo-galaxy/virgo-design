export const radius = {
  0: 0,
  4: '4px',
  6: '6px',
  8: '8px',
  10: '10px',
  12: '12px',
  16: '16px',
  20: '20px',
  24: '24px',
  full: '9999px',
} as const;

export type RadiusToken = keyof typeof radius;
