import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import Example from './StepsWorkflowExample';
import source from './StepsWorkflowExample.tsx?raw';

import style from './StepsWorkflowExample.module.scss?virgo-raw';
export const stepsExamples = {
  example0: {
    id: 'steps-workflow',
    title: 'Steps',
    titleTranslationKey: 'examples.steps.copy.title0',
    description: 'An ordered sequence of stages with consumer-owned progress and optional actions.',
    descriptionTranslationKey: 'examples.steps.copy.description0',
    Component: Example,
    source: createExampleSource(source),
    styleSource: style,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
