import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import FormBasicExample from './FormBasicExample';
import style0 from './FormBasicExample.module.scss?virgo-raw';
import source0 from './FormBasicExample.tsx?raw';
import FormHorizontalExample from './FormHorizontalExample';
import style1 from './FormHorizontalExample.module.scss?virgo-raw';
import source1 from './FormHorizontalExample.tsx?raw';
import FormSubmitExample from './FormSubmitExample';
import style2 from './FormSubmitExample.module.scss?virgo-raw';
import source2 from './FormSubmitExample.tsx?raw';
export const formExamples = {
  example0: {
    id: 'form-basic',
    title: 'Unified controls',
    titleTranslationKey: 'examples.form.copy.title0',
    description: 'Existing controls inherit field semantics.',
    descriptionTranslationKey: 'examples.form.copy.description0',
    Component: FormBasicExample,
    source: createExampleSource(source0),
    styleSource: style0,
  },
  example1: {
    id: 'form-horizontal',
    title: 'Horizontal layout',
    titleTranslationKey: 'examples.form.copy.title1',
    description: 'Labels align on wide screens and stack on small screens.',
    descriptionTranslationKey: 'examples.form.copy.description1',
    Component: FormHorizontalExample,
    source: createExampleSource(source1),
    styleSource: style1,
  },
  example2: {
    id: 'form-submit',
    title: 'Native submission',
    titleTranslationKey: 'examples.form.copy.title2',
    description: 'The consumer owns FormData, validation and feedback.',
    descriptionTranslationKey: 'examples.form.copy.description2',
    Component: FormSubmitExample,
    source: createExampleSource(source2),
    styleSource: style2,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
