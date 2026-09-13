export const iconColorTokens = {
  primary: 'icon.primary',
  secondary: 'icon.secondary',
  tertiary: 'icon.tertiary',
  disabled: 'icon.disabled',
  inverse: 'icon.inverse',
} as const;

export type IconColorRole = keyof typeof iconColorTokens;
