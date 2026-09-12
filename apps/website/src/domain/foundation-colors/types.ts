import type { ColorFamily, ColorScale } from '@virgo-design/colors';

export type FoundationGroupId = ColorFamily | 'brand' | 'neutral';
export type FoundationGroupKind = 'chromatic' | 'brand' | 'neutral';

export interface FoundationGroup {
  id: FoundationGroupId;
  kind: FoundationGroupKind;
  base: string;
  scale: ColorScale;
}
