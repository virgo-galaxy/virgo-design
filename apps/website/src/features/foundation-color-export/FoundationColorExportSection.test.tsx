import {
  generateColorPalette,
  VIRGO_BRAND_SCALE,
  VIRGO_CHROMATIC_BASES,
  VIRGO_NEUTRAL_SCALE,
} from '@virgo-design/colors';
import { describe, expect, it } from 'vitest';

import {
  type FoundationColorScales,
  type FoundationExportFormat,
  type FoundationScaleNaming,
  generateFoundationColorCode,
} from './foundation-color-export';

const foundationScales: FoundationColorScales = {
  palette: generateColorPalette({
    linked: false,
    bases: VIRGO_CHROMATIC_BASES,
  }),
  brandScale: VIRGO_BRAND_SCALE,
  neutralScale: VIRGO_NEUTRAL_SCALE,
};

describe('FoundationColorExportSection', () => {
  it.each([
    ['css', 'conventional'],
    ['scss', 'virgo'],
    ['tailwind', 'conventional'],
  ] as const satisfies readonly [FoundationExportFormat, FoundationScaleNaming][])(
    'exports only Foundation colors as %s with %s naming',
    (format, naming) => {
      const code = generateFoundationColorCode(foundationScales, format, naming);

      expect(code).toContain('Foundation Colors');
      expect(code).toContain(naming === 'virgo' ? 'vd-red-1' : 'vd-red-50');
      expect(code).toContain(naming === 'virgo' ? 'vd-neutral-10' : 'vd-neutral-900');
      expect(code).not.toMatch(/semantic|primary-soft|primary-active|status-success/i);
    },
  );

  it('emits all 140 current Foundation colors in the CSS export', () => {
    const declarations = generateFoundationColorCode(foundationScales)
      .split('\n')
      .filter((line) => line.startsWith('  --vd-'));

    expect(declarations).toHaveLength(140);
  });

  it('exports the supplied current Foundation scales without a Semantic mapping', () => {
    const code = generateFoundationColorCode({
      palette: {
        ...foundationScales.palette,
        scales: {
          ...foundationScales.palette.scales,
          red: {
            ...foundationScales.palette.scales.red,
            1: '#102030',
          },
        },
      },
      brandScale: {
        ...foundationScales.brandScale,
        1: '#405060',
      },
      neutralScale: {
        ...foundationScales.neutralScale,
        10: '#708090',
      },
    });

    expect(code).toContain('--vd-red-50: #102030;');
    expect(code).toContain('--vd-brand-50: #405060;');
    expect(code).toContain('--vd-neutral-900: #708090;');
    expect(code).not.toMatch(/semantic|primary-soft|primary-active|status-success/i);
  });
});
