import type { ColorFamily, ColorFamilyBases, ColorModel } from '@virgo-design/colors';

import type { FoundationGroupId } from '@/domain/foundation-colors';

export type FoundationPage = 'chromatic' | 'brand-neutral';
export type ChromaticMode = 'official' | 'linked' | 'custom';

export interface ColorStudioState {
  chromaticMode: ChromaticMode;
  anchor: string;
  model: ColorModel;
  hueSpread: number;
  distributionCurve: number;
  customBases: ColorFamilyBases;
  selectedFamily: ColorFamily;
  selectedFoundation: FoundationGroupId;
  foundationPage: FoundationPage;
  brandBase: string;
  neutralBase: string;
}
