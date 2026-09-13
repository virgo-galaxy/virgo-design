export const brandColorTokens = {
  primary: 'brand.primary',
  'primary-hover': 'brand.primary-hover',
  'primary-active': 'brand.primary-active',
  subtle: 'brand.subtle',
  'subtle-hover': 'brand.subtle-hover',
  foreground: 'brand.foreground',
  link: 'brand.link',
  'link-hover': 'brand.link-hover',
  focus: 'brand.focus',
} as const;

export type BrandColorRole = keyof typeof brandColorTokens;
