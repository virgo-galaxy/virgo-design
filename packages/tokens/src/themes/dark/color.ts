import {
  VIRGO_BRAND_SCALE,
  VIRGO_CHROMATIC_SCALES,
  VIRGO_NEUTRAL_SCALE,
} from '../../foundations/color.js';
import type { ColorSemanticTheme } from '../../types/semantic.js';
import { withAlpha } from '../color-utils.js';

const neutral = VIRGO_NEUTRAL_SCALE;
const brand = VIRGO_BRAND_SCALE;
const chromatic = VIRGO_CHROMATIC_SCALES;

export const darkColorTheme = {
  text: {
    primary: neutral[1],
    secondary: neutral[3],
    tertiary: neutral[4],
    placeholder: neutral[4],
    disabled: neutral[6],
    inverse: neutral[10],
  },
  surface: {
    background: neutral[10],
    default: neutral[10],
    secondary: withAlpha(neutral[1], 0.08),
    strong: withAlpha(neutral[1], 0.16),
    elevated: neutral[9],
    overlay: withAlpha(neutral[10], 0.64),
  },
  border: {
    subtle: withAlpha(neutral[1], 0.08),
    default: withAlpha(neutral[1], 0.16),
    strong: withAlpha(neutral[1], 0.32),
    disabled: withAlpha(neutral[1], 0.08),
    focus: brand[4],
  },
  icon: {
    primary: neutral[1],
    secondary: neutral[3],
    tertiary: neutral[4],
    disabled: neutral[6],
    inverse: neutral[10],
  },
  brand: {
    primary: brand[6],
    'primary-hover': brand[7],
    'primary-active': brand[8],
    subtle: withAlpha(brand[4], 0.16),
    'subtle-hover': withAlpha(brand[4], 0.24),
    foreground: neutral[1],
    link: brand[3],
    'link-hover': brand[2],
    focus: brand[4],
  },
  status: {
    success: {
      accent: chromatic.green[5],
      foreground: neutral[10],
      subtle: withAlpha(chromatic.green[5], 0.16),
      border: withAlpha(chromatic.green[5], 0.32),
      text: chromatic.green[4],
    },
    warning: {
      accent: chromatic.amber[5],
      foreground: neutral[10],
      subtle: withAlpha(chromatic.amber[5], 0.16),
      border: withAlpha(chromatic.amber[5], 0.32),
      text: chromatic.amber[4],
    },
    danger: {
      accent: chromatic.red[5],
      foreground: neutral[10],
      subtle: withAlpha(chromatic.red[5], 0.16),
      border: withAlpha(chromatic.red[5], 0.32),
      text: chromatic.red[4],
    },
    info: {
      accent: chromatic.blue[5],
      foreground: neutral[10],
      subtle: withAlpha(chromatic.blue[5], 0.16),
      border: withAlpha(chromatic.blue[5], 0.32),
      text: chromatic.blue[4],
    },
  },
  fill: {
    default: 'transparent',
    hover: withAlpha(neutral[1], 0.08),
    active: withAlpha(neutral[1], 0.16),
    selected: withAlpha(brand[4], 0.16),
    'selected-hover': withAlpha(brand[4], 0.24),
    disabled: withAlpha(neutral[1], 0.08),
  },
  data: {
    categorical: {
      1: chromatic.blue[4],
      2: chromatic.vermilion[4],
      3: chromatic.green[4],
      4: chromatic.magenta[4],
      5: chromatic.yellow[5],
      6: chromatic.indigo[4],
      7: chromatic.orange[5],
      8: chromatic.teal[4],
      9: chromatic.red[4],
      10: chromatic.chartreuse[5],
      11: chromatic.violet[4],
      12: chromatic.amber[5],
    },
    sequential: {
      1: brand[10],
      2: brand[9],
      3: brand[8],
      4: brand[7],
      5: brand[6],
      6: brand[5],
      7: brand[4],
      8: brand[3],
      9: brand[2],
      10: brand[1],
    },
    diverging: {
      negative: {
        strong: chromatic.red[4],
        default: chromatic.red[5],
        subtle: withAlpha(chromatic.red[5], 0.16),
      },
      neutral: neutral[8],
      positive: {
        subtle: withAlpha(chromatic.green[5], 0.16),
        default: chromatic.green[5],
        strong: chromatic.green[4],
      },
    },
  },
} as const satisfies ColorSemanticTheme;
