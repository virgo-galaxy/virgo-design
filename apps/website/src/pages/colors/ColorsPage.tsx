import { useMemo } from 'react';

import { ColorStudio } from '@/features/color-studio/ColorStudio';
import { buildFoundationGroups } from '@/features/color-studio/lib/foundation-groups';
import type { ColorStudioController } from '@/features/color-studio/model/use-color-studio';
import { PaletteGallery } from '@/features/palette-gallery/PaletteGallery';
import { ThemeBuilderSection } from '@/features/theme-builder/ThemeBuilderSection';

interface ColorsPageProps {
  studio: ColorStudioController;
}

export function ColorsPage({ studio }: ColorsPageProps) {
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
      <ColorStudio studio={studio} />

      <PaletteGallery
        groups={groups}
        appearance={studio.state.appearance}
        selectedFoundation={studio.state.selectedFoundation}
        onSelectedFoundationChange={studio.setSelectedFoundation}
      />

      <ThemeBuilderSection
        appearance={studio.state.appearance}
        palette={studio.palette}
        brandScale={studio.brandScale}
        neutralScale={studio.neutralScale}
      />
    </>
  );
}
