export const fillColorTokens = {
  default: 'fill.default',
  hover: 'fill.hover',
  active: 'fill.active',
  selected: 'fill.selected',
  'selected-hover': 'fill.selected-hover',
  disabled: 'fill.disabled',
} as const;

export type FillColorRole = keyof typeof fillColorTokens;
