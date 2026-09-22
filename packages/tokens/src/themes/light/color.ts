import { VIRGO_BRAND_SCALE, VIRGO_NEUTRAL_SCALE } from '../../foundations/color.js';
import { VIRGO_CHROMATIC_SCALES } from '../../foundations/color.js';
import type { ColorSemanticTheme } from '../../types/semantic.js';
import { withAlpha } from '../color-utils.js';

const neutral = VIRGO_NEUTRAL_SCALE;
const brand = VIRGO_BRAND_SCALE;
const chromatic = VIRGO_CHROMATIC_SCALES;

export const lightColorTheme = {
  text: {
    primary: neutral[10],
    secondary: neutral[7],
    tertiary: neutral[6],
    placeholder: neutral[6],
    disabled: neutral[4],
    inverse: neutral[1],
  },
  surface: {
    background: neutral[1],
    default: neutral[1],
    secondary: withAlpha(neutral[10], 0.08),
    strong: withAlpha(neutral[10], 0.16),
    elevated: neutral[1],
    overlay: withAlpha(neutral[10], 0.48),
  },
  border: {
    subtle: withAlpha(neutral[10], 0.08),
    default: withAlpha(neutral[10], 0.16),
    strong: withAlpha(neutral[10], 0.32),
    disabled: withAlpha(neutral[10], 0.08),
    focus: brand[6],
  },
  icon: {
    primary: neutral[10],
    secondary: neutral[7],
    tertiary: neutral[6],
    disabled: neutral[4],
    inverse: neutral[1],
  },
  brand: {
    primary: brand[6],
    'primary-hover': brand[7],
    'primary-active': brand[8],
    subtle: brand[1],
    'subtle-hover': brand[2],
    foreground: neutral[1],
    link: brand[7],
    'link-hover': brand[8],
    focus: brand[6],
  },
  status: {
    success: {
      solid: chromatic.green[8],
      onSolid: neutral[1],
      accent: chromatic.green[7],
      foreground: neutral[10],
      subtle: chromatic.green[1],
      border: chromatic.green[3],
      text: chromatic.green[8],
    },
    warning: {
      solid: chromatic.amber[8],
      onSolid: neutral[1],
      accent: chromatic.amber[7],
      foreground: neutral[10],
      subtle: chromatic.amber[1],
      border: chromatic.amber[3],
      text: chromatic.amber[8],
    },
    danger: {
      solid: chromatic.red[7],
      onSolid: neutral[1],
      accent: chromatic.red[7],
      foreground: neutral[1],
      subtle: chromatic.red[1],
      border: chromatic.red[3],
      text: chromatic.red[8],
    },
    info: {
      solid: chromatic.blue[7],
      onSolid: neutral[1],
      accent: chromatic.blue[7],
      foreground: neutral[1],
      subtle: chromatic.blue[1],
      border: chromatic.blue[3],
      text: chromatic.blue[8],
    },
  },
  fill: {
    default: 'transparent',
    hover: withAlpha(neutral[10], 0.08),
    active: withAlpha(neutral[10], 0.16),
    selected: brand[1],
    'selected-hover': brand[2],
    disabled: withAlpha(neutral[10], 0.08),
  },
  data: {
    categorical: {
      1: chromatic.blue[6],
      2: chromatic.vermilion[6],
      3: chromatic.green[7],
      4: chromatic.magenta[6],
      5: chromatic.yellow[8],
      6: chromatic.indigo[6],
      7: chromatic.orange[7],
      8: chromatic.teal[7],
      9: chromatic.red[6],
      10: chromatic.chartreuse[7],
      11: chromatic.violet[6],
      12: chromatic.amber[7],
    },
    sequential: {
      1: brand[1],
      2: brand[2],
      3: brand[3],
      4: brand[4],
      5: brand[5],
      6: brand[6],
      7: brand[7],
      8: brand[8],
      9: brand[9],
      10: brand[10],
    },
    diverging: {
      negative: {
        strong: chromatic.red[8],
        default: chromatic.red[6],
        subtle: chromatic.red[2],
      },
      neutral: neutral[2],
      positive: {
        subtle: chromatic.green[2],
        default: chromatic.green[6],
        strong: chromatic.green[8],
      },
    },
  },
} as const satisfies ColorSemanticTheme;
