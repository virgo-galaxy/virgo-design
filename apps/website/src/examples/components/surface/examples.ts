import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

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
    description:
      'Container tones follow the active theme; sizing and padding remain consumer-owned.',
    Component: SurfaceTonesExample,
    source: surfaceTonesSource,
    styleSource: surfaceTonesStyles,
  },
  surfaceMaterials: {
    id: 'surface-materials',
    title: 'Solid, translucent, and glass',
    description:
      'Compare three materials over the same offline landscape without blurring the content.',
    Component: SurfaceMaterialsExample,
    source: surfaceMaterialsSource,
    styleSource: surfaceMaterialsStyles,
  },
  surfaceColorBackground: {
    id: 'surface-color-background',
    title: 'Color and gradient backgrounds',
    description: 'Provide a decorative foundation and choose a foreground that remains readable.',
    Component: SurfaceColorBackgroundExample,
    source: surfaceColorBackgroundSource,
    styleSource: surfaceColorBackgroundStyles,
  },
  surfaceImageBackground: {
    id: 'surface-image-background',
    title: 'Image background',
    description:
      'This decorative landscape is embedded SVG; no remote image or private asset is required.',
    Component: SurfaceImageBackgroundExample,
    source: surfaceImageBackgroundSource,
    styleSource: surfaceImageBackgroundStyles,
  },
  surfaceImageMaterial: {
    id: 'surface-image-material',
    title: 'Image with glass material',
    description:
      'The image sits below the material while text and interactive children remain crisp.',
    Component: SurfaceImageMaterialExample,
    source: surfaceImageMaterialSource,
    styleSource: surfaceImageMaterialStyles,
  },
  surfaceImageContain: {
    id: 'surface-image-contain',
    title: 'Contain and position',
    description: 'Contain keeps the whole landscape visible and positions it without repeating.',
    Component: SurfaceImageContainExample,
    source: surfaceImageContainSource,
    styleSource: surfaceImageContainStyles,
  },
  surfaceElevation: {
    id: 'surface-elevation',
    title: 'Elevation',
    description: 'Six existing elevation levels are interpreted by the active theme.',
    Component: SurfaceElevationExample,
    source: surfaceElevationSource,
    styleSource: surfaceElevationStyles,
  },
  surfaceBorders: {
    id: 'surface-borders',
    title: 'Border strength',
    description:
      'Choose none, subtle, default, or strong without introducing custom border colors.',
    Component: SurfaceBordersExample,
    source: surfaceBordersSource,
    styleSource: surfaceBordersStyles,
  },
  surfaceRadius: {
    id: 'surface-radius',
    title: 'Corner shape',
    description: 'Radius uses foundation keys, including a fully rounded silhouette.',
    Component: SurfaceRadiusExample,
    source: surfaceRadiusSource,
    styleSource: surfaceRadiusStyles,
  },
  surfaceLayoutComposition: {
    id: 'surface-layout-composition',
    title: 'Layout and nested surfaces',
    description:
      'Layout controls regions; each region selects its material and nested content tone.',
    Component: SurfaceLayoutCompositionExample,
    source: surfaceLayoutCompositionSource,
    styleSource: surfaceLayoutCompositionStyles,
  },
  surfaceOverflow: {
    id: 'surface-overflow',
    title: 'Content outside rounded edges',
    description:
      'Rounded material does not clip ordinary children; this local canvas reserves room for overflow.',
    Component: SurfaceOverflowExample,
    source: surfaceOverflowSource,
    styleSource: surfaceOverflowStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
