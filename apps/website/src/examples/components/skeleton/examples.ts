import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import SkeletonCardExample from './SkeletonCardExample';
import skeletonCardStyles from './SkeletonCardExample.module.scss?virgo-raw';
import skeletonCardSource from './SkeletonCardExample.tsx?raw';
import SkeletonMotionExample from './SkeletonMotionExample';
import skeletonMotionStyles from './SkeletonMotionExample.module.scss?virgo-raw';
import skeletonMotionSource from './SkeletonMotionExample.tsx?raw';
import SkeletonShapesExample from './SkeletonShapesExample';
import skeletonShapesStyles from './SkeletonShapesExample.module.scss?virgo-raw';
import skeletonShapesSource from './SkeletonShapesExample.tsx?raw';

export const skeletonExamples = {
  skeletonShapes: {
    id: 'skeleton-shapes',
    title: 'Placeholder shapes',
    description: 'Text lines, rectangular media, and circular identities.',
    Component: SkeletonShapesExample,
    source: skeletonShapesSource,
    styleSource: skeletonShapesStyles,
  },
  skeletonCard: {
    id: 'skeleton-card',
    title: 'Card placeholder',
    description: 'Native dimensions preserve a future card’s layout.',
    Component: SkeletonCardExample,
    source: skeletonCardSource,
    styleSource: skeletonCardStyles,
  },
  skeletonMotion: {
    id: 'skeleton-motion',
    title: 'Motion control',
    description: 'Pulse can be disabled and respects reduced-motion preferences.',
    Component: SkeletonMotionExample,
    source: skeletonMotionSource,
    styleSource: skeletonMotionStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
