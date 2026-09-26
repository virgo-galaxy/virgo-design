import {
  VIRGO_BRAND_SCALE as colorBrandScale,
  VIRGO_CHROMATIC_BASES as colorChromaticBases,
  VIRGO_NEUTRAL_SCALE as colorNeutralScale,
} from '@virgo-design/colors';
import { describe, expect, expectTypeOf, it } from 'vitest';

import * as rootTokens from '../index.js';
import {
  borderStyle,
  borderWidth,
  type BorderWidthToken,
  duration,
  type DurationToken,
  easing,
  type EasingToken,
  elevationLevels,
  fontFamily,
  fontFamilyRole,
  fontSize,
  fontWeight,
  internationalSans,
  internationalSansOrder,
  lineHeight,
  radius,
  type RadiusToken,
  sansLocaleMapping,
  sizing,
  spacing,
  VIRGO_BRAND_SCALE,
  VIRGO_CHROMATIC_BASES,
  VIRGO_NEUTRAL_SCALE,
} from '../index.js';
import * as foundationTokens from './index.js';

describe('Foundations V1', () => {
  it('re-exports colors without creating a second color source', () => {
    expect(VIRGO_CHROMATIC_BASES).toBe(colorChromaticBases);
    expect(VIRGO_BRAND_SCALE).toBe(colorBrandScale);
    expect(VIRGO_NEUTRAL_SCALE).toBe(colorNeutralScale);
    expect(Object.keys(VIRGO_CHROMATIC_BASES)).toHaveLength(12);
    expect(Object.keys(VIRGO_BRAND_SCALE)).toHaveLength(10);
    expect(Object.keys(VIRGO_NEUTRAL_SCALE)).toHaveLength(10);
  });

  it('defines the approved typography primitives', () => {
    expect(fontFamily).toEqual({
      sans: '"Inter Variable", system-ui, sans-serif',
      mono: '"JetBrains Mono Variable", ui-monospace, monospace',
    });
    expect(fontFamilyRole).toEqual({
      sans: { name: 'Inter', family: fontFamily.sans },
      mono: { name: 'JetBrains Mono', family: fontFamily.mono },
    });
    expect(fontSize).toEqual({
      10: '10px',
      11: '11px',
      12: '12px',
      13: '13px',
      14: '14px',
      16: '16px',
      20: '20px',
      24: '24px',
      28: '28px',
      32: '32px',
      40: '40px',
      48: '48px',
      56: '56px',
      64: '64px',
    });
    expect(fontWeight).toEqual({
      400: 400,
      500: 500,
      600: 600,
      700: 700,
    });
    expect(lineHeight).toEqual({ 1: 1.1, 2: 1.25, 3: 1.4, 4: 1.6 });
  });

  it('defines locale-aware international sans stacks', () => {
    expect(internationalSansOrder).toEqual(['latin', 'zhHans', 'zhHantTW', 'zhHantHK', 'ja', 'ko']);
    expect(
      Object.values(internationalSans).map(({ locale, name }) => ({
        locale,
        name,
      })),
    ).toEqual([
      { locale: 'en', name: 'Inter' },
      { locale: 'zh-Hans', name: 'Noto Sans SC' },
      { locale: 'zh-Hant-TW', name: 'Noto Sans TC' },
      { locale: 'zh-Hant-HK', name: 'Noto Sans HK' },
      { locale: 'ja', name: 'Noto Sans JP' },
      { locale: 'ko', name: 'Noto Sans KR' },
    ]);
    expect(sansLocaleMapping).toMatchObject({
      en: 'latin',
      'zh-CN': 'zhHans',
      'zh-TW': 'zhHantTW',
      'zh-HK': 'zhHantHK',
      ja: 'ja',
      ko: 'ko',
    });
    expect(internationalSans).toMatchObject({
      latin: { family: '"Inter Variable", system-ui, sans-serif' },
      zhHans: {
        family: '"Inter Variable", "Noto Sans SC Variable", system-ui, sans-serif',
      },
      zhHantTW: {
        family: '"Inter Variable", "Noto Sans TC Variable", system-ui, sans-serif',
      },
      zhHantHK: {
        family: '"Inter Variable", "Noto Sans HK Variable", system-ui, sans-serif',
      },
      ja: { family: '"Inter Variable", "Noto Sans JP Variable", system-ui, sans-serif' },
      ko: { family: '"Inter Variable", "Noto Sans KR Variable", system-ui, sans-serif' },
    });
  });

  it('defines the approved layout primitives', () => {
    expect(Object.values(spacing)).toEqual([
      '0',
      '2px',
      '4px',
      '6px',
      '8px',
      '12px',
      '16px',
      '20px',
      '24px',
      '32px',
      '40px',
      '48px',
      '64px',
      '80px',
      '96px',
    ]);
    expect(Object.values(sizing)).toEqual([
      '12px',
      '16px',
      '20px',
      '24px',
      '28px',
      '32px',
      '36px',
      '40px',
      '44px',
      '48px',
      '56px',
      '64px',
      '72px',
      '80px',
      '96px',
    ]);
  });

  it('defines the approved shape, depth, and motion primitives', () => {
    expect(borderWidth).toEqual({ 0: 0, 1: '1px', 2: '2px' });
    expect(borderStyle).toEqual({ solid: 'solid', dashed: 'dashed' });
    expect(radius).toEqual({
      0: 0,
      4: '4px',
      6: '6px',
      8: '8px',
      10: '10px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
      full: '9999px',
    });
    expect(elevationLevels).toEqual([0, 1, 2, 3, 4, 5]);
    expect(duration).toEqual({
      0: '0ms',
      120: '120ms',
      180: '180ms',
      240: '240ms',
      360: '360ms',
      560: '560ms',
    });
    expect(easing).toEqual({
      linear: 'linear',
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      decelerate: 'cubic-bezier(0.16, 1, 0.3, 1)',
      accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
      emphasized: 'cubic-bezier(0.22, 1, 0.36, 1)',
    });
  });

  it('exports numeric Motion durations and non-directional easing keys without legacy aliases', () => {
    expectTypeOf<DurationToken>().toEqualTypeOf<0 | 120 | 180 | 240 | 360 | 560>();
    expectTypeOf<EasingToken>().toEqualTypeOf<
      'linear' | 'standard' | 'decelerate' | 'accelerate' | 'emphasized'
    >();

    for (const legacyKey of ['instant', 'fast', 'normal', 'moderate', 'slow', 'slower']) {
      expect(duration).not.toHaveProperty(legacyKey);
    }
    for (const legacyKey of ['enter', 'exit']) {
      expect(easing).not.toHaveProperty(legacyKey);
    }
  });

  it('exports numeric Shape keys without legacy aliases or a circle token', () => {
    expectTypeOf<BorderWidthToken>().toEqualTypeOf<0 | 1 | 2>();
    expectTypeOf<RadiusToken>().toEqualTypeOf<0 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 'full'>();

    for (const legacyKey of ['none', 'thin', 'strong']) {
      expect(borderWidth).not.toHaveProperty(legacyKey);
    }
    for (const legacyKey of ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'circle']) {
      expect(radius).not.toHaveProperty(legacyKey);
    }
  });

  it('keeps Shape and Motion exports consistent across the package root and Foundations barrel', () => {
    expect(foundationTokens.borderWidth).toBe(borderWidth);
    expect(foundationTokens.borderStyle).toBe(borderStyle);
    expect(foundationTokens.radius).toBe(radius);
    expect(foundationTokens.duration).toBe(duration);
    expect(foundationTokens.easing).toBe(easing);
    expect(rootTokens.duration).toBe(duration);
    expect(rootTokens.easing).toBe(easing);
  });

  it('does not expose theme-unaware elevation shadows or an Opacity Foundation', () => {
    expect(foundationTokens).not.toHaveProperty('elevation');
    expect(foundationTokens).not.toHaveProperty('opacity');
    expect(rootTokens).not.toHaveProperty('elevation');
    expect(rootTokens).not.toHaveProperty('opacity');
  });
});
