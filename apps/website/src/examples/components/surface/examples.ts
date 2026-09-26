import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import SurfaceBordersExample from './SurfaceBordersExample';
import surfaceBordersSource from './SurfaceBordersExample.tsx?raw';
import SurfaceColorBackgroundExample from './SurfaceColorBackgroundExample';
import surfaceColorBackgroundSource from './SurfaceColorBackgroundExample.tsx?raw';
import SurfaceElevationExample from './SurfaceElevationExample';
import surfaceElevationSource from './SurfaceElevationExample.tsx?raw';
import SurfaceImageBackgroundExample from './SurfaceImageBackgroundExample';
import surfaceImageBackgroundSource from './SurfaceImageBackgroundExample.tsx?raw';
import SurfaceImageContainExample from './SurfaceImageContainExample';
import surfaceImageContainSource from './SurfaceImageContainExample.tsx?raw';
import SurfaceImageMaterialExample from './SurfaceImageMaterialExample';
import surfaceImageMaterialSource from './SurfaceImageMaterialExample.tsx?raw';
import SurfaceLayoutCompositionExample from './SurfaceLayoutCompositionExample';
import surfaceLayoutCompositionSource from './SurfaceLayoutCompositionExample.tsx?raw';
import SurfaceMaterialsExample from './SurfaceMaterialsExample';
import surfaceMaterialsSource from './SurfaceMaterialsExample.tsx?raw';
import SurfaceOverflowExample from './SurfaceOverflowExample';
import surfaceOverflowSource from './SurfaceOverflowExample.tsx?raw';
import SurfaceRadiusExample from './SurfaceRadiusExample';
import surfaceRadiusSource from './SurfaceRadiusExample.tsx?raw';
import SurfaceTonesExample from './SurfaceTonesExample';
import surfaceTonesSource from './SurfaceTonesExample.tsx?raw';

export const surfaceExamples = {
  surfaceTones: {
    id: 'surface-tones',
    title: 'Semantic tones',
    description:
      'Container tones follow the active theme; sizing and padding remain consumer-owned.',
    Component: SurfaceTonesExample,
    source: surfaceTonesSource,
  },
  surfaceMaterials: {
    id: 'surface-materials',
    title: 'Solid, translucent, and glass',
    description:
      'Compare three materials over the same offline landscape without blurring the content.',
    Component: SurfaceMaterialsExample,
    source: surfaceMaterialsSource,
  },
  surfaceColorBackground: {
    id: 'surface-color-background',
    title: 'Color and gradient backgrounds',
    description: 'Provide a decorative foundation and choose a foreground that remains readable.',
    Component: SurfaceColorBackgroundExample,
    source: surfaceColorBackgroundSource,
  },
  surfaceImageBackground: {
    id: 'surface-image-background',
    title: 'Image background',
    description:
      'This decorative landscape is embedded SVG; no remote image or private asset is required.',
    Component: SurfaceImageBackgroundExample,
    source: surfaceImageBackgroundSource,
  },
  surfaceImageMaterial: {
    id: 'surface-image-material',
    title: 'Image with glass material',
    description:
      'The image sits below the material while text and interactive children remain crisp.',
    Component: SurfaceImageMaterialExample,
    source: surfaceImageMaterialSource,
  },
  surfaceImageContain: {
    id: 'surface-image-contain',
    title: 'Contain and position',
    description: 'Contain keeps the whole landscape visible and positions it without repeating.',
    Component: SurfaceImageContainExample,
    source: surfaceImageContainSource,
  },
  surfaceElevation: {
    id: 'surface-elevation',
    title: 'Elevation',
    description: 'Six existing elevation levels are interpreted by the active theme.',
    Component: SurfaceElevationExample,
    source: surfaceElevationSource,
  },
  surfaceBorders: {
    id: 'surface-borders',
    title: 'Border strength',
    description:
      'Choose none, subtle, default, or strong without introducing custom border colors.',
    Component: SurfaceBordersExample,
    source: surfaceBordersSource,
  },
  surfaceRadius: {
    id: 'surface-radius',
    title: 'Corner shape',
    description: 'Radius uses foundation keys, including a fully rounded silhouette.',
    Component: SurfaceRadiusExample,
    source: surfaceRadiusSource,
  },
  surfaceLayoutComposition: {
    id: 'surface-layout-composition',
    title: 'Layout and nested surfaces',
    description:
      'Layout controls regions; each region selects its material and nested content tone.',
    Component: SurfaceLayoutCompositionExample,
    source: surfaceLayoutCompositionSource,
  },
  surfaceOverflow: {
    id: 'surface-overflow',
    title: 'Content outside rounded edges',
    description:
      'Rounded material does not clip ordinary children; this local canvas reserves room for overflow.',
    Component: SurfaceOverflowExample,
    source: surfaceOverflowSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
