import type { ColorFamily, ColorScaleStep } from '@virgo-design/colors';

export type FoundationColorFamily = ColorFamily | 'brand' | 'neutral';

export interface FoundationColorReference {
  family: FoundationColorFamily;
  step: ColorScaleStep;
  alpha?: number;
}
