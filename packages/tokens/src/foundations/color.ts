import { generateColorPalette, VIRGO_CHROMATIC_BASES } from '@virgo-design/colors';

// @virgo-design/colors remains the single source of truth for all 140 foundation colors.
export * from '@virgo-design/colors';

export const VIRGO_CHROMATIC_SCALES = generateColorPalette({
  linked: false,
  bases: VIRGO_CHROMATIC_BASES,
  model: 'oklch',
}).scales;
