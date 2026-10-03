import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import Composition from './ResultCompositionExample';
import compositionStyles from './ResultCompositionExample.module.scss?virgo-raw';
import compositionSource from './ResultCompositionExample.tsx?raw';
import Variants from './ResultVariantsExample';
import variantsStyles from './ResultVariantsExample.module.scss?virgo-raw';
import variantsSource from './ResultVariantsExample.tsx?raw';
export const resultExamples = {
  variants: {
    id: 'result-variants',
    title: 'Outcome and exception states',
    titleTranslationKey: 'components.result.variants',
    description: 'Success, error, warning, info, 403, 404 and 500 share one structure.',
    descriptionTranslationKey: 'components.result.variantDescription',
    Component: Variants,
    source: createExampleSource(variantsSource),
    styleSource: variantsStyles,
  },
  composition: {
    id: 'result-composition',
    title: 'Compound composition',
    titleTranslationKey: 'components.result.composition',
    description: 'Replace the icon or add business content without rebuilding the outcome layout.',
    descriptionTranslationKey: 'components.result.compositionDescription',
    Component: Composition,
    source: createExampleSource(compositionSource),
    styleSource: compositionStyles,
  },
} as const satisfies Record<string, ComponentExampleDefinition>;
