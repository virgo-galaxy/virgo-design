import type { ColorScale } from '../types.js';
import type { ColorFamily } from './constants.js';

export type ColorModel = 'oklch' | 'hsl' | 'hsv';

export type ColorFamilyBases = Record<ColorFamily, string>;
export type ColorFamilyScales = Record<ColorFamily, ColorScale>;

export interface LinkedColorPaletteConfig {
  linked: true;
  anchor: string;
  anchorFamily?: ColorFamily;
  model?: ColorModel;
  hueSpread?: number;
  distributionCurve?: number;
}

export interface CustomColorPaletteConfig {
  linked: false;
  bases: ColorFamilyBases;
  model?: ColorModel;
}

export type ColorPaletteConfig = LinkedColorPaletteConfig | CustomColorPaletteConfig;

export interface GeneratedColorPalette {
  linked: boolean;
  model: ColorModel;
  bases: ColorFamilyBases;
  scales: ColorFamilyScales;
}
