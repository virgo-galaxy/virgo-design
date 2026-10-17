import { CHROMATIC_FAMILIES, type ColorScale, type GeneratedColorPalette } from '@virgo-design/colors';

import type { FoundationGroup } from './types';

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
  const chromatic: FoundationGroup[] = CHROMATIC_FAMILIES.map((family) => ({
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
