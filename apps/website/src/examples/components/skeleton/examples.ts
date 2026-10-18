import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import SkeletonCardExample from './SkeletonCardExample';
import skeletonCardSource from './SkeletonCardExample.tsx?raw';
import SkeletonMotionExample from './SkeletonMotionExample';
import skeletonMotionSource from './SkeletonMotionExample.tsx?raw';
import SkeletonShapesExample from './SkeletonShapesExample';
import skeletonShapesSource from './SkeletonShapesExample.tsx?raw';

import skeletonCardStyles from './SkeletonCardExample.module.scss?virgo-raw';
import skeletonMotionStyles from './SkeletonMotionExample.module.scss?virgo-raw';
import skeletonShapesStyles from './SkeletonShapesExample.module.scss?virgo-raw';

export const skeletonExamples = {
  skeletonShapes: {
    id: 'skeleton-shapes',
    title: 'Placeholder shapes',
    titleTranslationKey: 'examples.skeleton.copy.placeholderShapes',
    description: 'Text lines, rectangular media, and circular identities.',
    descriptionTranslationKey:
      'examples.skeleton.copy.textLinesRectangularMediaAndCircularIdentities',
    Component: SkeletonShapesExample,
    source: createExampleSource(skeletonShapesSource),
    styleSource: skeletonShapesStyles,
  },
  skeletonCard: {
    id: 'skeleton-card',
    title: 'Card placeholder',
    titleTranslationKey: 'examples.skeleton.copy.cardPlaceholder',
    description: 'Native dimensions preserve a future card’s layout.',
    descriptionTranslationKey: 'examples.skeleton.copy.nativeDimensionsPreserveAFutureCardSLayout',
    Component: SkeletonCardExample,
    source: createExampleSource(skeletonCardSource),
    styleSource: skeletonCardStyles,
  },
  skeletonMotion: {
    id: 'skeleton-motion',
    title: 'Motion control',
    titleTranslationKey: 'examples.skeleton.copy.motionControl',
    description: 'Pulse can be disabled and respects reduced-motion preferences.',
    descriptionTranslationKey:
      'examples.skeleton.copy.pulseCanBeDisabledAndRespectsReducedMotionPreferences',
    Component: SkeletonMotionExample,
    source: createExampleSource(skeletonMotionSource),
    styleSource: skeletonMotionStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
