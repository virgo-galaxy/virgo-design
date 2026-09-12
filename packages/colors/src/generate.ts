import { hexToOklch, normalizeHex, oklchToHex } from './oklch.js';
import type { ColorScale, ColorScaleStep, GenerateColorScaleOptions } from './types.js';

const LIGHTNESS_TOWARD_WHITE = [1, 0.8, 0.6, 0.4, 0.2] as const;

const LIGHT_CHROMA_FACTORS = [0.08, 0.18, 0.34, 0.55, 0.78] as const;

const LIGHTEST_LIGHTNESS = 0.985;

const DARKNESS_TOWARD_BLACK = [0.18, 0.38, 0.62, 0.82] as const;

const DARK_CHROMA_FACTORS = [1.03, 0.98, 0.88, 0.74] as const;

const DARKEST_LIGHTNESS = 0.22;

function interpolate(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

export function generateColorScale(
  baseHex: string,
  options: GenerateColorScaleOptions = {},
): ColorScale {
  const baseHexNormalized = normalizeHex(baseHex);
  const base = hexToOklch(baseHexNormalized);

  const chroma = options.chroma ?? 1;

  if (!Number.isFinite(chroma) || chroma <= 0) {
    throw new Error('chroma must be a finite number greater than 0.');
  }

  const scale: Partial<Record<ColorScaleStep, string>> = {};

  for (let index = 0; index < 5; index += 1) {
    const step = (index + 1) as ColorScaleStep;

    scale[step] = oklchToHex({
      l: interpolate(base.l, LIGHTEST_LIGHTNESS, LIGHTNESS_TOWARD_WHITE[index]!),
      c: base.c * LIGHT_CHROMA_FACTORS[index]! * chroma,
      h: base.h,
    });
  }

  scale[6] = baseHexNormalized;

  for (let index = 0; index < 4; index += 1) {
    const step = (index + 7) as ColorScaleStep;

    scale[step] = oklchToHex({
      l: interpolate(base.l, DARKEST_LIGHTNESS, DARKNESS_TOWARD_BLACK[index]!),
      c: base.c * DARK_CHROMA_FACTORS[index]! * chroma,
      h: base.h,
    });
  }

  return scale as ColorScale;
}
