import {
  findMaxOklchChroma,
  findPeakOklchLightness,
  hexToHsl,
  hexToHsv,
  hexToOklch,
  hslToHex,
  hsvToHex,
  normalizeHex,
  normalizeHue,
  oklchToHex,
} from './color-space.js';
import {
  COLOR_FAMILIES,
  type ColorFamily,
  DEFAULT_ANCHOR_FAMILY,
  DEFAULT_DISTRIBUTION_CURVE,
  DEFAULT_HUE_SPREAD,
} from './constants.js';
import { applyDistributionCurve, getCircularFamilyOffset } from './distribution.js';
import type { ColorFamilyBases, ColorModel } from './types.js';

interface GenerateLinkedBasesOptions {
  anchor: string;
  anchorFamily?: ColorFamily;
  model?: ColorModel;
  hueSpread?: number;
  distributionCurve?: number;
}

const OKLCH_LIGHTNESS_COMPENSATION = 0.65;
const OKLCH_CHROMA_HEADROOM = 0.96;

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

function generateOklchBase(anchor: string, targetHue: number): string {
  const anchorColor = hexToOklch(anchor);

  const anchorMaximumChroma = findMaxOklchChroma(anchorColor.l, anchorColor.h);

  const anchorChromaRatio =
    anchorMaximumChroma <= 0 ? 0 : clamp(anchorColor.c / anchorMaximumChroma, 0, 1);

  const anchorPeakLightness = findPeakOklchLightness(anchorColor.h);
  const targetPeakLightness = findPeakOklchLightness(targetHue);

  /*
   * Different hue regions have very different sRGB gamut shapes.
   *
   * Keeping the anchor's absolute OKLCH lightness across every hue makes
   * yellow/green families appear unnecessarily dark. Instead, we follow
   * part of the gamut's natural lightness shift while keeping the brand
   * anchor as the perceptual reference.
   */
  const targetLightness = clamp(
    anchorColor.l + (targetPeakLightness - anchorPeakLightness) * OKLCH_LIGHTNESS_COMPENSATION,
    0.28,
    0.92,
  );

  const targetMaximumChroma = findMaxOklchChroma(targetLightness, targetHue);

  /*
   * Preserve relative chroma usage rather than absolute chroma.
   *
   * Example:
   * if the anchor uses ~85% of the available chroma at its hue,
   * generated families also use ~85% of the chroma available to them.
   */
  const targetChroma = targetMaximumChroma * Math.min(anchorChromaRatio, OKLCH_CHROMA_HEADROOM);

  return oklchToHex({
    l: targetLightness,
    c: targetChroma,
    h: targetHue,
  });
}

export function generateLinkedColorBases({
  anchor,
  anchorFamily = DEFAULT_ANCHOR_FAMILY,
  model = 'oklch',
  hueSpread = DEFAULT_HUE_SPREAD,
  distributionCurve = DEFAULT_DISTRIBUTION_CURVE,
}: GenerateLinkedBasesOptions): ColorFamilyBases {
  const normalizedAnchor = normalizeHex(anchor);

  const familyCount = COLOR_FAMILIES.length;
  const anchorIndex = COLOR_FAMILIES.indexOf(anchorFamily);

  if (anchorIndex === -1) {
    throw new Error(`Unknown anchor family: ${anchorFamily}`);
  }

  const safeSpread = clamp(hueSpread, 0.6, 1.2);
  const safeCurve = clamp(distributionCurve, 0.5, 2);
  const baseHueGap = 360 / familyCount;

  const anchorHsl = hexToHsl(normalizedAnchor);
  const anchorHsv = hexToHsv(normalizedAnchor);
  const anchorOklch = hexToOklch(normalizedAnchor);

  return Object.fromEntries(
    COLOR_FAMILIES.map((family, familyIndex) => {
      if (family === anchorFamily) {
        return [family, normalizedAnchor];
      }

      const rawOffset = getCircularFamilyOffset(familyIndex, anchorIndex, familyCount);

      const distributedOffset = applyDistributionCurve(rawOffset, familyCount, safeCurve);

      const hueOffset = distributedOffset * baseHueGap * safeSpread;

      switch (model) {
        case 'hsl':
          return [
            family,
            hslToHex({
              ...anchorHsl,
              h: normalizeHue(anchorHsl.h + hueOffset),
            }),
          ];

        case 'hsv':
          return [
            family,
            hsvToHex({
              ...anchorHsv,
              h: normalizeHue(anchorHsv.h + hueOffset),
            }),
          ];

        case 'oklch':
        default: {
          const targetHue = normalizeHue(anchorOklch.h + hueOffset);

          return [family, generateOklchBase(normalizedAnchor, targetHue)];
        }
      }
    }),
  ) as ColorFamilyBases;
}
