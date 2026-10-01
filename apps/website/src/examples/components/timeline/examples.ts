import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import TimelineBasicExample from './TimelineBasicExample';
import style0 from './TimelineBasicExample.module.scss?virgo-raw';
import source0 from './TimelineBasicExample.tsx?raw';
import TimelineIndicatorsExample from './TimelineIndicatorsExample';
import style1 from './TimelineIndicatorsExample.module.scss?virgo-raw';
import source1 from './TimelineIndicatorsExample.tsx?raw';
export const timelineExamples = {
  example0: {
    id: 'timeline-basic',
    title: 'Events and timestamps',
    titleTranslationKey: 'examples.timeline.copy.title0',
    description: 'Native list and time semantics retain reading order.',
    descriptionTranslationKey: 'examples.timeline.copy.description0',
    Component: TimelineBasicExample,
    source: createExampleSource(source0),
    styleSource: style0,
  },
  example1: {
    id: 'timeline-indicators',
    title: 'Compact custom indicators',
    titleTranslationKey: 'examples.timeline.copy.title1',
    description: 'Existing icons compose with the chronological list.',
    descriptionTranslationKey: 'examples.timeline.copy.description1',
    Component: TimelineIndicatorsExample,
    source: createExampleSource(source1),
    styleSource: style1,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
