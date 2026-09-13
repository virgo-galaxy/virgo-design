export const textColorTokens = {
  primary: 'text.primary',
  secondary: 'text.secondary',
  tertiary: 'text.tertiary',
  placeholder: 'text.placeholder',
  disabled: 'text.disabled',
  inverse: 'text.inverse',
} as const;

export type TextColorRole = keyof typeof textColorTokens;
