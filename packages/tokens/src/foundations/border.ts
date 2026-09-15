export const borderWidth = {
  0: 0,
  1: '1px',
  2: '2px',
} as const;

export const borderStyle = {
  solid: 'solid',
  dashed: 'dashed',
} as const;

export type BorderWidthToken = keyof typeof borderWidth;
export type BorderStyleToken = keyof typeof borderStyle;
