import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import ProgressIntentsExample from './ProgressIntentsExample';
import progressIntentsStyles from './ProgressIntentsExample.module.scss?virgo-raw';
import progressIntentsSource from './ProgressIntentsExample.tsx?raw';
import ProgressSizesExample from './ProgressSizesExample';
import progressSizesStyles from './ProgressSizesExample.module.scss?virgo-raw';
import progressSizesSource from './ProgressSizesExample.tsx?raw';
import ProgressValuesExample from './ProgressValuesExample';
import progressValuesStyles from './ProgressValuesExample.module.scss?virgo-raw';
import progressValuesSource from './ProgressValuesExample.tsx?raw';

export const progressExamples = {
  progressValues: {
    id: 'progress-values',
    title: 'Values and boundaries',
    titleTranslationKey: 'examples.progress.copy.valuesAndBoundaries',
    description: 'Completion is normalized against max, including zero and complete.',
    descriptionTranslationKey:
      'examples.progress.copy.completionIsNormalizedAgainstMaxIncludingZeroAndComplete',
    Component: ProgressValuesExample,
    source: createExampleSource(progressValuesSource),
    styleSource: progressValuesStyles,
  },
  progressSizes: {
    id: 'progress-sizes',
    title: 'Track sizes',
    titleTranslationKey: 'examples.progress.copy.trackSizes',
    description: 'Track thickness changes without changing the semantic value.',
    descriptionTranslationKey:
      'examples.progress.copy.trackThicknessChangesWithoutChangingTheSemanticValue',
    Component: ProgressSizesExample,
    source: createExampleSource(progressSizesSource),
    styleSource: progressSizesStyles,
  },
  progressIntents: {
    id: 'progress-intents',
    title: 'Semantic intents',
    titleTranslationKey: 'examples.progress.copy.semanticIntents',
    description: 'Status colors express meaningful task outcomes.',
    descriptionTranslationKey: 'examples.progress.copy.statusColorsExpressMeaningfulTaskOutcomes',
    Component: ProgressIntentsExample,
    source: createExampleSource(progressIntentsSource),
    styleSource: progressIntentsStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
