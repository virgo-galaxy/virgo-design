import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import SkeletonCardExample from './SkeletonCardExample';
import skeletonCardSource from './SkeletonCardExample.tsx?raw';
import SkeletonMotionExample from './SkeletonMotionExample';
import skeletonMotionSource from './SkeletonMotionExample.tsx?raw';
import SkeletonShapesExample from './SkeletonShapesExample';
import skeletonShapesSource from './SkeletonShapesExample.tsx?raw';

export const skeletonExamples = {
  skeletonShapes: {
    id: 'skeleton-shapes',
    title: 'Placeholder shapes',
    description: 'Text lines, rectangular media, and circular identities.',
    Component: SkeletonShapesExample,
    source: skeletonShapesSource,
  },
  skeletonCard: {
    id: 'skeleton-card',
    title: 'Card placeholder',
    description: 'Native dimensions preserve a future card’s layout.',
    Component: SkeletonCardExample,
    source: skeletonCardSource,
  },
  skeletonMotion: {
    id: 'skeleton-motion',
    title: 'Motion control',
    description: 'Pulse can be disabled and respects reduced-motion preferences.',
    Component: SkeletonMotionExample,
    source: skeletonMotionSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
