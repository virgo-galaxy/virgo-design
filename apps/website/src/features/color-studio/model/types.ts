import type { ColorFamily, ColorFamilyBases, ColorModel } from '@virgo-design/colors';

export type Appearance = 'light' | 'dark';
export type FoundationPage = 'chromatic' | 'brand-neutral';
export type FoundationGroupId = ColorFamily | 'brand' | 'neutral';
export type ChromaticMode = 'official' | 'linked' | 'custom';

export interface ColorStudioState {
  chromaticMode: ChromaticMode;
  anchor: string;
  model: ColorModel;
  hueSpread: number;
  distributionCurve: number;
  customBases: ColorFamilyBases;
  appearance: Appearance;
  selectedFamily: ColorFamily;
  selectedFoundation: FoundationGroupId;
  foundationPage: FoundationPage;
  brandBase: string;
  neutralBase: string;
}
