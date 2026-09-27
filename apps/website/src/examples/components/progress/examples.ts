import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

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
    description: 'Completion is normalized against max, including zero and complete.',
    Component: ProgressValuesExample,
    source: progressValuesSource,
    styleSource: progressValuesStyles,
  },
  progressSizes: {
    id: 'progress-sizes',
    title: 'Track sizes',
    description: 'Track thickness changes without changing the semantic value.',
    Component: ProgressSizesExample,
    source: progressSizesSource,
    styleSource: progressSizesStyles,
  },
  progressIntents: {
    id: 'progress-intents',
    title: 'Semantic intents',
    description: 'Status colors express meaningful task outcomes.',
    Component: ProgressIntentsExample,
    source: progressIntentsSource,
    styleSource: progressIntentsStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
