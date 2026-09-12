export const borderWidth = {
  none: '0',
  thin: '1px',
  strong: '2px',
} as const;

export const borderStyle = {
  solid: 'solid',
  dashed: 'dashed',
} as const;

export type BorderWidthToken = keyof typeof borderWidth;
export type BorderStyleToken = keyof typeof borderStyle;
