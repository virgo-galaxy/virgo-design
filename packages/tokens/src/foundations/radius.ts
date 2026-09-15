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

export const radiusCssVariables = {
  '--vd-radius-0': radius[0],
  '--vd-radius-4': radius[4],
  '--vd-radius-6': radius[6],
  '--vd-radius-8': radius[8],
  '--vd-radius-10': radius[10],
  '--vd-radius-12': radius[12],
  '--vd-radius-16': radius[16],
  '--vd-radius-20': radius[20],
  '--vd-radius-24': radius[24],
  '--vd-radius-full': radius.full,
} as const;

export type RadiusToken = keyof typeof radius;
export type RadiusCssVariable = keyof typeof radiusCssVariables;
