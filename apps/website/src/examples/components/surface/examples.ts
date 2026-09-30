import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import SurfaceBordersExample from './SurfaceBordersExample';
import surfaceBordersStyles from './SurfaceBordersExample.module.scss?virgo-raw';
import surfaceBordersSource from './SurfaceBordersExample.tsx?raw';
import SurfaceColorBackgroundExample from './SurfaceColorBackgroundExample';
import surfaceColorBackgroundStyles from './SurfaceColorBackgroundExample.module.scss?virgo-raw';
import surfaceColorBackgroundSource from './SurfaceColorBackgroundExample.tsx?raw';
import SurfaceElevationExample from './SurfaceElevationExample';
import surfaceElevationStyles from './SurfaceElevationExample.module.scss?virgo-raw';
import surfaceElevationSource from './SurfaceElevationExample.tsx?raw';
import SurfaceImageBackgroundExample from './SurfaceImageBackgroundExample';
import surfaceImageBackgroundStyles from './SurfaceImageBackgroundExample.module.scss?virgo-raw';
import surfaceImageBackgroundSource from './SurfaceImageBackgroundExample.tsx?raw';
import SurfaceImageContainExample from './SurfaceImageContainExample';
import surfaceImageContainStyles from './SurfaceImageContainExample.module.scss?virgo-raw';
import surfaceImageContainSource from './SurfaceImageContainExample.tsx?raw';
import SurfaceImageMaterialExample from './SurfaceImageMaterialExample';
import surfaceImageMaterialStyles from './SurfaceImageMaterialExample.module.scss?virgo-raw';
import surfaceImageMaterialSource from './SurfaceImageMaterialExample.tsx?raw';
import SurfaceLayoutCompositionExample from './SurfaceLayoutCompositionExample';
import surfaceLayoutCompositionStyles from './SurfaceLayoutCompositionExample.module.scss?virgo-raw';
import surfaceLayoutCompositionSource from './SurfaceLayoutCompositionExample.tsx?raw';
import SurfaceMaterialsExample from './SurfaceMaterialsExample';
import surfaceMaterialsStyles from './SurfaceMaterialsExample.module.scss?virgo-raw';
import surfaceMaterialsSource from './SurfaceMaterialsExample.tsx?raw';
import SurfaceOverflowExample from './SurfaceOverflowExample';
import surfaceOverflowStyles from './SurfaceOverflowExample.module.scss?virgo-raw';
import surfaceOverflowSource from './SurfaceOverflowExample.tsx?raw';
import SurfaceRadiusExample from './SurfaceRadiusExample';
import surfaceRadiusStyles from './SurfaceRadiusExample.module.scss?virgo-raw';
import surfaceRadiusSource from './SurfaceRadiusExample.tsx?raw';
import SurfaceTonesExample from './SurfaceTonesExample';
import surfaceTonesStyles from './SurfaceTonesExample.module.scss?virgo-raw';
import surfaceTonesSource from './SurfaceTonesExample.tsx?raw';

export const surfaceExamples = {
  surfaceTones: {
    id: 'surface-tones',
    title: 'Semantic tones',
    titleTranslationKey: 'examples.surface.copy.semanticTones',
    description:
      'Container tones follow the active theme; sizing and padding remain consumer-owned.',
    descriptionTranslationKey:
      'examples.surface.copy.containerTonesFollowTheActiveThemeSizingAndPaddingRemain',
    Component: SurfaceTonesExample,
    source: createExampleSource(surfaceTonesSource),
    styleSource: surfaceTonesStyles,
  },
  surfaceMaterials: {
    id: 'surface-materials',
    title: 'Solid, translucent, and glass',
    titleTranslationKey: 'examples.surface.copy.solidTranslucentAndGlass',
    description:
      'Compare three materials over the same offline landscape without blurring the content.',
    descriptionTranslationKey:
      'examples.surface.copy.compareThreeMaterialsOverTheSameOfflineLandscapeWithoutBlurring',
    Component: SurfaceMaterialsExample,
    source: createExampleSource(surfaceMaterialsSource),
    styleSource: surfaceMaterialsStyles,
  },
  surfaceColorBackground: {
    id: 'surface-color-background',
    title: 'Color and gradient backgrounds',
    titleTranslationKey: 'examples.surface.copy.colorAndGradientBackgrounds',
    description: 'Provide a decorative foundation and choose a foreground that remains readable.',
    descriptionTranslationKey:
      'examples.surface.copy.provideADecorativeFoundationAndChooseAForegroundThatRemains',
    Component: SurfaceColorBackgroundExample,
    source: createExampleSource(surfaceColorBackgroundSource),
    styleSource: surfaceColorBackgroundStyles,
  },
  surfaceImageBackground: {
    id: 'surface-image-background',
    title: 'Image background',
    titleTranslationKey: 'examples.surface.copy.imageBackground',
    description:
      'This decorative landscape is embedded SVG; no remote image or private asset is required.',
    descriptionTranslationKey:
      'examples.surface.copy.thisDecorativeLandscapeIsEmbeddedSvgNoRemoteImageOr',
    Component: SurfaceImageBackgroundExample,
    source: createExampleSource(surfaceImageBackgroundSource),
    styleSource: surfaceImageBackgroundStyles,
  },
  surfaceImageMaterial: {
    id: 'surface-image-material',
    title: 'Image with glass material',
    titleTranslationKey: 'examples.surface.copy.imageWithGlassMaterial',
    description:
      'The image sits below the material while text and interactive children remain crisp.',
    descriptionTranslationKey:
      'examples.surface.copy.theImageSitsBelowTheMaterialWhileTextAndInteractive',
    Component: SurfaceImageMaterialExample,
    source: createExampleSource(surfaceImageMaterialSource),
    styleSource: surfaceImageMaterialStyles,
  },
  surfaceImageContain: {
    id: 'surface-image-contain',
    title: 'Contain and position',
    titleTranslationKey: 'examples.surface.copy.containAndPosition',
    description: 'Contain keeps the whole landscape visible and positions it without repeating.',
    descriptionTranslationKey:
      'examples.surface.copy.containKeepsTheWholeLandscapeVisibleAndPositionsItWithout',
    Component: SurfaceImageContainExample,
    source: createExampleSource(surfaceImageContainSource),
    styleSource: surfaceImageContainStyles,
  },
  surfaceElevation: {
    id: 'surface-elevation',
    title: 'Elevation',
    titleTranslationKey: 'examples.surface.copy.elevation',
    description: 'Six existing elevation levels are interpreted by the active theme.',
    descriptionTranslationKey:
      'examples.surface.copy.sixExistingElevationLevelsAreInterpretedByTheActiveTheme',
    Component: SurfaceElevationExample,
    source: createExampleSource(surfaceElevationSource),
    styleSource: surfaceElevationStyles,
  },
  surfaceBorders: {
    id: 'surface-borders',
    title: 'Border strength',
    titleTranslationKey: 'examples.surface.copy.borderStrength',
    description:
      'Choose none, subtle, default, or strong without introducing custom border colors.',
    descriptionTranslationKey:
      'examples.surface.copy.chooseNoneSubtleDefaultOrStrongWithoutIntroducingCustomBorder',
    Component: SurfaceBordersExample,
    source: createExampleSource(surfaceBordersSource),
    styleSource: surfaceBordersStyles,
  },
  surfaceRadius: {
    id: 'surface-radius',
    title: 'Corner shape',
    titleTranslationKey: 'examples.surface.copy.cornerShape',
    description: 'Radius uses foundation keys, including a fully rounded silhouette.',
    descriptionTranslationKey:
      'examples.surface.copy.radiusUsesFoundationKeysIncludingAFullyRoundedSilhouette',
    Component: SurfaceRadiusExample,
    source: createExampleSource(surfaceRadiusSource),
    styleSource: surfaceRadiusStyles,
  },
  surfaceLayoutComposition: {
    id: 'surface-layout-composition',
    title: 'Layout and nested surfaces',
    titleTranslationKey: 'examples.surface.copy.layoutAndNestedSurfaces',
    description:
      'Layout controls regions; each region selects its material and nested content tone.',
    descriptionTranslationKey:
      'examples.surface.copy.layoutControlsRegionsEachRegionSelectsItsMaterialAndNested',
    Component: SurfaceLayoutCompositionExample,
    source: createExampleSource(surfaceLayoutCompositionSource),
    styleSource: surfaceLayoutCompositionStyles,
  },
  surfaceOverflow: {
    id: 'surface-overflow',
    title: 'Content outside rounded edges',
    titleTranslationKey: 'examples.surface.copy.contentOutsideRoundedEdges',
    description:
      'Rounded material does not clip ordinary children; this local canvas reserves room for overflow.',
    descriptionTranslationKey:
      'examples.surface.copy.roundedMaterialDoesNotClipOrdinaryChildrenThisLocalCanvas',
    Component: SurfaceOverflowExample,
    source: createExampleSource(surfaceOverflowSource),
    styleSource: surfaceOverflowStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
