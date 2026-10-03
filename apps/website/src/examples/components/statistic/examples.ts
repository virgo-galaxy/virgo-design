import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import Composition from './StatisticCompositionExample';
import compositionStyles from './StatisticCompositionExample.module.scss?virgo-raw';
import compositionSource from './StatisticCompositionExample.tsx?raw';
import Variants from './StatisticVariantsExample';
import variantsStyles from './StatisticVariantsExample.module.scss?virgo-raw';
import variantsSource from './StatisticVariantsExample.tsx?raw';
export const statisticExamples = {
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
