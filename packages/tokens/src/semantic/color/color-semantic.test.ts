import { describe, expect, it } from 'vitest';

import {
  VIRGO_BRAND_SCALE,
  VIRGO_CHROMATIC_SCALES,
  VIRGO_NEUTRAL_SCALE,
} from '../../foundations/color.js';
import { darkColorTheme } from '../../themes/dark/color.js';
import { lightColorTheme } from '../../themes/light/color.js';
import {
  borderColorTokens,
  brandColorTokens,
  categoricalDataColorTokens,
  COLOR_SEMANTIC_ROLE_COUNT,
  divergingDataColorTokens,
  fillColorTokens,
  iconColorTokens,
  sequentialDataColorTokens,
  statusColorTokens,
  surfaceColorTokens,
  textColorTokens,
} from './index.js';

describe('Color Semantic V1', () => {
  it('defines all 86 approved semantic color roles', () => {
    const roleCount =
      Object.keys(textColorTokens).length +
      Object.keys(surfaceColorTokens).length +
      Object.keys(borderColorTokens).length +
      Object.keys(iconColorTokens).length +
      Object.keys(brandColorTokens).length +
      Object.values(statusColorTokens).reduce(
        (total, roles) => total + Object.keys(roles).length,
        0,
      ) +
      Object.keys(fillColorTokens).length +
      Object.keys(categoricalDataColorTokens).length +
      Object.keys(sequentialDataColorTokens).length +
      Object.keys(divergingDataColorTokens.negative).length +
      1 +
      Object.keys(divergingDataColorTokens.positive).length;

    expect(roleCount).toBe(COLOR_SEMANTIC_ROLE_COUNT);
  });

  it('resolves text, surface, border, icon, brand, and fill roles for both themes', () => {
    expect(lightColorTheme.text).toEqual({
      primary: VIRGO_NEUTRAL_SCALE[10],
      secondary: VIRGO_NEUTRAL_SCALE[7],
      tertiary: VIRGO_NEUTRAL_SCALE[6],
      placeholder: VIRGO_NEUTRAL_SCALE[6],
      disabled: VIRGO_NEUTRAL_SCALE[4],
      inverse: VIRGO_NEUTRAL_SCALE[1],
    });
    expect(darkColorTheme.text).toEqual({
      primary: VIRGO_NEUTRAL_SCALE[1],
      secondary: VIRGO_NEUTRAL_SCALE[3],
      tertiary: VIRGO_NEUTRAL_SCALE[4],
      placeholder: VIRGO_NEUTRAL_SCALE[4],
      disabled: VIRGO_NEUTRAL_SCALE[6],
      inverse: VIRGO_NEUTRAL_SCALE[10],
    });

    expect(lightColorTheme.surface).toEqual({
      background: VIRGO_NEUTRAL_SCALE[1],
      default: VIRGO_NEUTRAL_SCALE[1],
      secondary: 'rgb(36 38 45 / 0.08)',
      strong: 'rgb(36 38 45 / 0.16)',
      elevated: VIRGO_NEUTRAL_SCALE[1],
      overlay: 'rgb(36 38 45 / 0.48)',
    });
    expect(darkColorTheme.surface).toEqual({
      background: VIRGO_NEUTRAL_SCALE[10],
      default: VIRGO_NEUTRAL_SCALE[10],
      secondary: 'rgb(250 250 251 / 0.08)',
      strong: 'rgb(250 250 251 / 0.16)',
      elevated: VIRGO_NEUTRAL_SCALE[9],
      overlay: 'rgb(36 38 45 / 0.64)',
    });

    expect(lightColorTheme.border).toEqual({
      subtle: 'rgb(36 38 45 / 0.08)',
      default: 'rgb(36 38 45 / 0.16)',
      strong: 'rgb(36 38 45 / 0.32)',
      disabled: 'rgb(36 38 45 / 0.08)',
      focus: VIRGO_BRAND_SCALE[6],
    });
    expect(darkColorTheme.border.focus).toBe(VIRGO_BRAND_SCALE[4]);
    expect(lightColorTheme.icon).toEqual({
      primary: lightColorTheme.text.primary,
      secondary: lightColorTheme.text.secondary,
      tertiary: lightColorTheme.text.tertiary,
      disabled: lightColorTheme.text.disabled,
      inverse: lightColorTheme.text.inverse,
    });
    expect(darkColorTheme.icon).toEqual({
      primary: darkColorTheme.text.primary,
      secondary: darkColorTheme.text.secondary,
      tertiary: darkColorTheme.text.tertiary,
      disabled: darkColorTheme.text.disabled,
      inverse: darkColorTheme.text.inverse,
    });

    expect(Object.values(lightColorTheme.brand)).toEqual([
      VIRGO_BRAND_SCALE[6],
      VIRGO_BRAND_SCALE[7],
      VIRGO_BRAND_SCALE[8],
      VIRGO_BRAND_SCALE[1],
      VIRGO_BRAND_SCALE[2],
      VIRGO_NEUTRAL_SCALE[1],
      VIRGO_BRAND_SCALE[7],
      VIRGO_BRAND_SCALE[8],
      VIRGO_BRAND_SCALE[6],
    ]);
    expect(Object.values(darkColorTheme.brand)).toEqual([
      VIRGO_BRAND_SCALE[6],
      VIRGO_BRAND_SCALE[7],
      VIRGO_BRAND_SCALE[8],
      'rgb(122 166 248 / 0.16)',
      'rgb(122 166 248 / 0.24)',
      VIRGO_NEUTRAL_SCALE[1],
      VIRGO_BRAND_SCALE[3],
      VIRGO_BRAND_SCALE[2],
      VIRGO_BRAND_SCALE[4],
    ]);
    expect(lightColorTheme.fill.default).toBe('transparent');
    expect(darkColorTheme.fill['selected-hover']).toBe('rgb(122 166 248 / 0.24)');
  });

  it('resolves all status families to the approved foundation steps', () => {
    expect(lightColorTheme.status.success).toEqual({
      accent: VIRGO_CHROMATIC_SCALES.green[7],
      foreground: VIRGO_NEUTRAL_SCALE[10],
      subtle: VIRGO_CHROMATIC_SCALES.green[1],
      border: VIRGO_CHROMATIC_SCALES.green[3],
      text: VIRGO_CHROMATIC_SCALES.green[8],
    });
    expect(lightColorTheme.status.warning.accent).toBe(VIRGO_CHROMATIC_SCALES.amber[7]);
    expect(lightColorTheme.status.danger.foreground).toBe(VIRGO_NEUTRAL_SCALE[1]);
    expect(lightColorTheme.status.info.text).toBe(VIRGO_CHROMATIC_SCALES.blue[8]);

    expect(darkColorTheme.status.success.subtle).toBe('rgb(106 209 137 / 0.16)');
    expect(darkColorTheme.status.warning.border).toBe('rgb(233 181 96 / 0.32)');
    expect(darkColorTheme.status.danger.text).toBe(VIRGO_CHROMATIC_SCALES.red[4]);
    expect(darkColorTheme.status.info.accent).toBe(VIRGO_CHROMATIC_SCALES.blue[5]);
  });

  it('resolves categorical, sequential, and diverging data colors', () => {
    expect(Object.values(lightColorTheme.data.categorical)).toEqual([
      VIRGO_CHROMATIC_SCALES.blue[6],
      VIRGO_CHROMATIC_SCALES.vermilion[6],
      VIRGO_CHROMATIC_SCALES.green[7],
      VIRGO_CHROMATIC_SCALES.magenta[6],
      VIRGO_CHROMATIC_SCALES.yellow[8],
      VIRGO_CHROMATIC_SCALES.indigo[6],
      VIRGO_CHROMATIC_SCALES.orange[7],
      VIRGO_CHROMATIC_SCALES.teal[7],
      VIRGO_CHROMATIC_SCALES.red[6],
      VIRGO_CHROMATIC_SCALES.chartreuse[7],
      VIRGO_CHROMATIC_SCALES.violet[6],
      VIRGO_CHROMATIC_SCALES.amber[7],
    ]);
    expect(Object.values(darkColorTheme.data.categorical)).toHaveLength(12);
    expect(Object.values(lightColorTheme.data.sequential)).toEqual(
      Object.values(VIRGO_BRAND_SCALE),
    );
    expect(Object.values(darkColorTheme.data.sequential)).toEqual(
      Object.values(VIRGO_BRAND_SCALE).reverse(),
    );
    expect(lightColorTheme.data.diverging.negative.strong).toBe(VIRGO_CHROMATIC_SCALES.red[8]);
    expect(lightColorTheme.data.diverging.neutral).toBe(VIRGO_NEUTRAL_SCALE[2]);
    expect(darkColorTheme.data.diverging.positive.subtle).toBe('rgb(106 209 137 / 0.16)');
  });
});
