import { COLOR_FAMILIES, type ColorScale, type GeneratedColorPalette } from '@virgo-design/colors';

import type { FoundationGroupId } from '../model/types';

export type FoundationGroupKind = 'chromatic' | 'brand' | 'neutral';

export interface FoundationGroup {
  id: FoundationGroupId;
  kind: FoundationGroupKind;
  base: string;
  scale: ColorScale;
}

interface BuildFoundationGroupsOptions {
  palette: GeneratedColorPalette;
  brandScale: ColorScale;
  neutralScale: ColorScale;
}

export function buildFoundationGroups({
  palette,
  brandScale,
  neutralScale,
}: BuildFoundationGroupsOptions): readonly FoundationGroup[] {
  const chromatic: FoundationGroup[] = COLOR_FAMILIES.map((family) => ({
    id: family,
    kind: 'chromatic',
    base: palette.bases[family],
    scale: palette.scales[family],
  }));

  return [
    ...chromatic,
    {
      id: 'brand',
      kind: 'brand',
      base: brandScale[6],
      scale: brandScale,
    },
    {
      id: 'neutral',
      kind: 'neutral',
      base: neutralScale[6],
      scale: neutralScale,
    },
  ];
}
