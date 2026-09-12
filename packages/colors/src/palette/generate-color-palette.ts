import { normalizeHex } from './color-space.js';
import {
  COLOR_FAMILIES,
  DEFAULT_ANCHOR_FAMILY,
  DEFAULT_DISTRIBUTION_CURVE,
  DEFAULT_HUE_SPREAD,
} from './constants.js';
import { generateLinkedColorBases } from './generate-linked-bases.js';
import { generateColorScaleByModel } from './generate-model-scale.js';
import type {
  ColorFamilyBases,
  ColorFamilyScales,
  ColorPaletteConfig,
  GeneratedColorPalette,
} from './types.js';

export function generateColorPalette(config: ColorPaletteConfig): GeneratedColorPalette {
  const model = config.model ?? 'oklch';

  const bases: ColorFamilyBases = config.linked
    ? generateLinkedColorBases({
        anchor: config.anchor,
        anchorFamily: config.anchorFamily ?? DEFAULT_ANCHOR_FAMILY,
        model,
        hueSpread: config.hueSpread ?? DEFAULT_HUE_SPREAD,
        distributionCurve: config.distributionCurve ?? DEFAULT_DISTRIBUTION_CURVE,
      })
    : (Object.fromEntries(
        COLOR_FAMILIES.map((family) => [family, normalizeHex(config.bases[family])]),
      ) as ColorFamilyBases);

  const scales = Object.fromEntries(
    COLOR_FAMILIES.map((family) => [family, generateColorScaleByModel(bases[family], model)]),
  ) as ColorFamilyScales;

  return {
    linked: config.linked,
    model,
    bases,
    scales,
  };
}
