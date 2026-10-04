import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import Animation from './StatisticAnimationExample';
import animationStyles from './StatisticAnimationExample.module.scss?virgo-raw';
import animationSource from './StatisticAnimationExample.tsx?raw';
import Composition from './StatisticCompositionExample';
import compositionStyles from './StatisticCompositionExample.module.scss?virgo-raw';
import compositionSource from './StatisticCompositionExample.tsx?raw';
import Variants from './StatisticVariantsExample';
import variantsStyles from './StatisticVariantsExample.module.scss?virgo-raw';
import variantsSource from './StatisticVariantsExample.tsx?raw';
export const statisticExamples = {
  animation: {
    id: 'statistic-animation',
    title: 'Numeric animation',
    titleTranslationKey: 'components.statistic.animation',
    description:
      'Count from zero on entry and smoothly retarget from the current value when data changes, using the decelerate motion token.',
    descriptionTranslationKey: 'components.statistic.animationDescription',
    Component: Animation,
    source: createExampleSource(animationSource),
    styleSource: animationStyles,
  },
  variants: {
    id: 'statistic-variants',
    title: 'Values, trends and loading',
    titleTranslationKey: 'components.statistic.variants',
    description:
      'Use semantic change intent independently of direction. Loading preserves the metric footprint.',
    descriptionTranslationKey: 'components.statistic.variantDescription',
    Component: Variants,
    source: createExampleSource(variantsSource),
    styleSource: variantsStyles,
  },
  composition: {
    id: 'statistic-composition',
    title: 'Compound composition',
    titleTranslationKey: 'components.statistic.composition',
    description: 'Compose labels and values while keeping the product grid outside the component.',
    descriptionTranslationKey: 'components.statistic.compositionDescription',
    Component: Composition,
    source: createExampleSource(compositionSource),
    styleSource: compositionStyles,
  },
} as const satisfies Record<string, ComponentExampleDefinition>;
