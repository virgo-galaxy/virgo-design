import { useMemo } from 'react';

import { buildFoundationGroups } from '@/domain/foundation-colors';
import { ColorStudio } from '@/features/color-studio/ColorStudio';
import { useColorStudio } from '@/features/color-studio/model/use-color-studio';
import { FoundationColorExportSection } from '@/features/foundation-color-export/FoundationColorExportSection';
import { PaletteGallery } from '@/features/palette-gallery/PaletteGallery';
import { useAppearance } from '@/shared/theme/use-appearance';

import { ColorsOverview } from './ColorsOverview';

export function ColorsPage() {
  const { appearance } = useAppearance();
  const studio = useColorStudio();
  const groups = useMemo(
    () =>
      buildFoundationGroups({
        palette: studio.palette,
        brandScale: studio.brandScale,
        neutralScale: studio.neutralScale,
      }),
    [studio.brandScale, studio.neutralScale, studio.palette],
  );

  return (
    <>
      <ColorsOverview />

      <ColorStudio studio={studio} appearance={appearance} />

      <PaletteGallery
        groups={groups}
        appearance={appearance}
        selectedFoundation={studio.state.selectedFoundation}
        onSelectedFoundationChange={studio.setSelectedFoundation}
      />

      <FoundationColorExportSection
        palette={studio.palette}
        brandScale={studio.brandScale}
        neutralScale={studio.neutralScale}
      />
    </>
  );
}
