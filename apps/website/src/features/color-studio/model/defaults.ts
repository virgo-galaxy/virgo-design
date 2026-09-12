import { VIRGO_BRAND_BASE, VIRGO_CHROMATIC_BASES, VIRGO_NEUTRAL_BASE } from '@virgo-design/colors';

import type { ColorStudioState } from './types';

export const VIRGO_PALETTE_ANCHOR = VIRGO_CHROMATIC_BASES.blue;

export const VIRGO_STUDIO_DEFAULTS: ColorStudioState = {
  chromaticMode: 'official',
  anchor: VIRGO_PALETTE_ANCHOR,
  model: 'oklch',
  hueSpread: 1,
  distributionCurve: 1,
  customBases: { ...VIRGO_CHROMATIC_BASES },
  selectedFamily: 'blue',
  selectedFoundation: 'blue',
  foundationPage: 'chromatic',
  brandBase: VIRGO_BRAND_BASE,
  neutralBase: VIRGO_NEUTRAL_BASE,
};
