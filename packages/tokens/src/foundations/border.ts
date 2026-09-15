export const borderWidth = {
  0: 0,
  1: '1px',
  2: '2px',
} as const;

export const borderStyle = {
  solid: 'solid',
  dashed: 'dashed',
} as const;

export const borderWidthCssVariables = {
  '--vd-border-width-0': borderWidth[0],
  '--vd-border-width-1': borderWidth[1],
  '--vd-border-width-2': borderWidth[2],
} as const;

export type BorderWidthToken = keyof typeof borderWidth;
export type BorderStyleToken = keyof typeof borderStyle;
export type BorderWidthCssVariable = keyof typeof borderWidthCssVariables;
