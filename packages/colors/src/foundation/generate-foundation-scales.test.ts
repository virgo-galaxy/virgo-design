import { describe, expect, it } from 'vitest';

import { generateColorScale } from '../generate.js';
import {
  VIRGO_BRAND_BASE,
  VIRGO_BRAND_SCALE,
  VIRGO_NEUTRAL_BASE,
  VIRGO_NEUTRAL_SCALE,
} from '../palette/presets.js';

describe('Virgo brand foundation', () => {
  it('freezes the standard ten-step color scale algorithm for the round-one baseline', () => {
    expect(VIRGO_BRAND_SCALE).toEqual(generateColorScale(VIRGO_BRAND_BASE));
  });
});

describe('Virgo neutral foundation', () => {
  it('freezes the standard ten-step color scale algorithm for the round-one baseline', () => {
    expect(VIRGO_NEUTRAL_SCALE).toEqual(generateColorScale(VIRGO_NEUTRAL_BASE));
  });
});
