export const borderColorTokens = {
  subtle: 'border.subtle',
  default: 'border.default',
  strong: 'border.strong',
  disabled: 'border.disabled',
  focus: 'border.focus',
} as const;

export type BorderColorRole = keyof typeof borderColorTokens;
