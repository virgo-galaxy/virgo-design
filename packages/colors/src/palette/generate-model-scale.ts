import { generateColorScale } from '../generate.js';
import type { ColorScale } from '../types.js';
import { hexToHsl, hexToHsv, hslToHex, hsvToHex, normalizeHex } from './color-space.js';
import type { ColorModel } from './types.js';

const LIGHT_RATIOS = [0.94, 0.76, 0.58, 0.4, 0.2] as const;
const DARK_RATIOS = [0.18, 0.36, 0.56, 0.76] as const;

const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

function generateHslScale(base: string): ColorScale {
  const color = hexToHsl(base);

  const light = (ratio: number) =>
    hslToHex({
      h: color.h,
      s: color.s * lerp(1, 0.5, ratio),
      l: lerp(color.l, 0.98, ratio),
    });

  const dark = (ratio: number) =>
    hslToHex({
      h: color.h,
      s: color.s * lerp(1, 0.92, ratio),
      l: lerp(color.l, 0.12, ratio),
    });

  return {
    1: light(LIGHT_RATIOS[0]),
    2: light(LIGHT_RATIOS[1]),
    3: light(LIGHT_RATIOS[2]),
    4: light(LIGHT_RATIOS[3]),
    5: light(LIGHT_RATIOS[4]),
    6: normalizeHex(base),
    7: dark(DARK_RATIOS[0]),
    8: dark(DARK_RATIOS[1]),
    9: dark(DARK_RATIOS[2]),
    10: dark(DARK_RATIOS[3]),
  };
}

function generateHsvScale(base: string): ColorScale {
  const color = hexToHsv(base);

  const light = (ratio: number) =>
    hsvToHex({
      h: color.h,
      s: color.s * lerp(1, 0.24, ratio),
      v: lerp(color.v, 1, ratio),
    });

  const dark = (ratio: number) =>
    hsvToHex({
      h: color.h,
      s: Math.min(1, color.s * lerp(1, 1.06, ratio)),
      v: lerp(color.v, 0.16, ratio),
    });

  return {
    1: light(LIGHT_RATIOS[0]),
    2: light(LIGHT_RATIOS[1]),
    3: light(LIGHT_RATIOS[2]),
    4: light(LIGHT_RATIOS[3]),
    5: light(LIGHT_RATIOS[4]),
    6: normalizeHex(base),
    7: dark(DARK_RATIOS[0]),
    8: dark(DARK_RATIOS[1]),
    9: dark(DARK_RATIOS[2]),
    10: dark(DARK_RATIOS[3]),
  };
}

export function generateColorScaleByModel(base: string, model: ColorModel): ColorScale {
  switch (model) {
    case 'hsl':
      return generateHslScale(base);

    case 'hsv':
      return generateHsvScale(base);

    case 'oklch':
    default:
      return generateColorScale(base);
  }
}
