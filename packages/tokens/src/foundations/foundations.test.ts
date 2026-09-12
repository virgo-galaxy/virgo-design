import {
  VIRGO_BRAND_SCALE as colorBrandScale,
  VIRGO_CHROMATIC_BASES as colorChromaticBases,
  VIRGO_NEUTRAL_SCALE as colorNeutralScale,
} from '@virgo-design/colors';
import { describe, expect, it } from 'vitest';

import {
  borderStyle,
  borderWidth,
  duration,
  easing,
  elevation,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  opacity,
  radius,
  sizing,
  spacing,
  VIRGO_BRAND_SCALE,
  VIRGO_CHROMATIC_BASES,
  VIRGO_NEUTRAL_SCALE,
} from '../index.js';

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
      sans: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Helvetica, Arial, sans-serif',
      mono: 'ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace',
    });
    expect(Object.values(fontSize)).toEqual([
      '12px',
      '13px',
      '14px',
      '16px',
      '18px',
      '20px',
      '24px',
      '28px',
      '32px',
      '40px',
      '48px',
      '64px',
    ]);
    expect(Object.values(fontWeight)).toEqual([400, 500, 600, 700, 800]);
    expect(Object.values(lineHeight)).toEqual([1.1, 1.25, 1.4, 1.6]);
    expect(Object.values(letterSpacing)).toEqual([
      '-0.03em',
      '-0.02em',
      '-0.01em',
      '0',
      '0.01em',
      '0.02em',
    ]);
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

  it('defines the approved shape, depth, opacity, and motion primitives', () => {
    expect(borderWidth).toEqual({ none: '0', thin: '1px', strong: '2px' });
    expect(borderStyle).toEqual({ solid: 'solid', dashed: 'dashed' });
    expect(radius).toEqual({
      none: '0',
      xs: '4px',
      sm: '6px',
      md: '8px',
      lg: '10px',
      xl: '12px',
      '2xl': '16px',
      '3xl': '20px',
      '4xl': '24px',
      full: '9999px',
    });
    expect(elevation).toEqual({
      0: 'none',
      1: '0 1px 2px rgba(15, 18, 23, 0.06), 0 1px 1px rgba(15, 18, 23, 0.04)',
      2: '0 4px 12px rgba(15, 18, 23, 0.08), 0 1px 3px rgba(15, 18, 23, 0.06)',
      3: '0 10px 30px rgba(15, 18, 23, 0.10), 0 2px 8px rgba(15, 18, 23, 0.06)',
      4: '0 20px 50px rgba(15, 18, 23, 0.14), 0 4px 16px rgba(15, 18, 23, 0.08)',
      5: '0 32px 80px rgba(15, 18, 23, 0.18), 0 8px 24px rgba(15, 18, 23, 0.10)',
    });
    expect(opacity).toEqual({ 100: 1, 80: 0.8, 64: 0.64, 48: 0.48, 32: 0.32, 16: 0.16, 8: 0.08 });
    expect(Object.values(duration)).toEqual(['0ms', '120ms', '180ms', '240ms', '360ms', '560ms']);
    expect(easing).toEqual({
      linear: 'linear',
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
      exit: 'cubic-bezier(0.4, 0, 1, 1)',
      emphasized: 'cubic-bezier(0.22, 1, 0.36, 1)',
    });
  });
});
