import { describe, expect, it } from 'vitest';

import { generateColorScale } from '../generate.js';
import { CHROMATIC_FAMILIES, CHROMATIC_FAMILY_COUNT, CHROMATIC_HUE_STEP } from './constants.js';
import { generateColorPalette } from './generate-color-palette.js';
import {
  VIRGO_BRAND_BASE,
  VIRGO_BRAND_SCALE,
  VIRGO_CHROMATIC_BASES,
  VIRGO_NEUTRAL_BASE,
  VIRGO_NEUTRAL_SCALE,
} from './presets.js';

describe('chromatic foundation', () => {
  it('uses the twelve classic one-word chromatic families', () => {
    expect(CHROMATIC_FAMILY_COUNT).toBe(12);
    expect(CHROMATIC_HUE_STEP).toBe(30);
    expect(CHROMATIC_FAMILIES).toEqual([
      'red',
      'vermilion',
      'orange',
      'amber',
      'yellow',
      'chartreuse',
      'green',
      'teal',
      'blue',
      'indigo',
      'violet',
      'magenta',
    ]);
  });

  it('ships a complete frozen Virgo Design base palette', () => {
    expect(Object.keys(VIRGO_CHROMATIC_BASES)).toEqual(CHROMATIC_FAMILIES);
    expect(VIRGO_CHROMATIC_BASES.blue).toBe('#2b7eea');
    expect(VIRGO_CHROMATIC_BASES.magenta).toBe('#d936b8');
  });

  it('generates ten tonal steps for every frozen official base', () => {
    const palette = generateColorPalette({
      linked: false,
      model: 'oklch',
      bases: VIRGO_CHROMATIC_BASES,
    });

    for (const family of CHROMATIC_FAMILIES) {
      expect(Object.keys(palette.scales[family])).toHaveLength(10);
      expect(palette.scales[family][6]).toBe(VIRGO_CHROMATIC_BASES[family]);
    }
  });
});

describe('brand and neutral foundation', () => {
  it('freezes the standard ten-step brand baseline', () => {
    expect(VIRGO_BRAND_SCALE).toEqual(generateColorScale(VIRGO_BRAND_BASE));
  });

  it('freezes the standard ten-step neutral baseline', () => {
    expect(VIRGO_NEUTRAL_SCALE).toEqual(generateColorScale(VIRGO_NEUTRAL_BASE));
  });

  it('ships exactly 140 foundation colors', () => {
    const total =
      CHROMATIC_FAMILIES.length * 10 +
      Object.keys(VIRGO_BRAND_SCALE).length +
      Object.keys(VIRGO_NEUTRAL_SCALE).length;

    expect(total).toBe(140);
  });
});

describe('linked palette generation', () => {
  it('still supports generating twelve linked families from one palette anchor', () => {
    const palette = generateColorPalette({
      linked: true,
      anchor: '#2B7EEA',
      anchorFamily: 'blue',
      model: 'oklch',
    });

    expect(Object.keys(palette.bases)).toHaveLength(12);
    expect(palette.bases.blue).toBe('#2B7EEA');
  });

  it('keeps the palette anchor exact across all supported models', () => {
    for (const model of ['oklch', 'hsl', 'hsv'] as const) {
      const palette = generateColorPalette({
        linked: true,
        anchor: '#2B7EEA',
        anchorFamily: 'blue',
        model,
      });

      expect(palette.bases.blue).toBe('#2B7EEA');
    }
  });

  it('adapts OKLCH hue families instead of copying one absolute chroma value', () => {
    const palette = generateColorPalette({
      linked: true,
      anchor: '#2B7EEA',
      anchorFamily: 'blue',
      model: 'oklch',
    });

    expect(palette.bases.yellow).not.toBe(palette.bases.blue);
    expect(palette.bases.green).not.toBe(palette.bases.blue);
    expect(palette.bases.violet).not.toBe(palette.bases.blue);
  });
});
