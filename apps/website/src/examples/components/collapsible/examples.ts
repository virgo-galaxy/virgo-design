import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import Example from './CollapsibleDisclosureExample';
import source from './CollapsibleDisclosureExample.tsx?raw';

import style from './CollapsibleDisclosureExample.module.scss?virgo-raw';
export const collapsibleExamples = {
  example0: {
    id: 'collapsible-disclosure',
    title: 'Collapsible',
    titleTranslationKey: 'examples.collapsible.copy.title0',
    description:
      'A disclosure trigger and labelled content region with controlled or uncontrolled expansion.',
    descriptionTranslationKey: 'examples.collapsible.copy.description0',
    Component: Example,
    source: createExampleSource(source),
    styleSource: style,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
