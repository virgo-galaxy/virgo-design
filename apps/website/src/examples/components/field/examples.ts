import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import FieldBasicExample from './FieldBasicExample';
import style0 from './FieldBasicExample.module.scss?virgo-raw';
import source0 from './FieldBasicExample.tsx?raw';
import FieldStatesExample from './FieldStatesExample';
import style2 from './FieldStatesExample.module.scss?virgo-raw';
import source2 from './FieldStatesExample.tsx?raw';
import FieldValidationExample from './FieldValidationExample';
import style1 from './FieldValidationExample.module.scss?virgo-raw';
import source1 from './FieldValidationExample.tsx?raw';
export const fieldExamples = {
  example0: {
    id: 'field-basic',
    title: 'Label and description',
    titleTranslationKey: 'examples.field.copy.title0',
    description: 'Generated IDs associate one control with its supporting text.',
    descriptionTranslationKey: 'examples.field.copy.description0',
    Component: FieldBasicExample,
    source: createExampleSource(source0),
    styleSource: style0,
  },
  example1: {
    id: 'field-validation',
    title: 'Consumer validation',
    titleTranslationKey: 'examples.field.copy.title1',
    description: 'Validation runs in the example, not in Field.',
    descriptionTranslationKey: 'examples.field.copy.description1',
    Component: FieldValidationExample,
    source: createExampleSource(source1),
    styleSource: style1,
  },
  example2: {
    id: 'field-states',
    title: 'Disabled and read-only',
    titleTranslationKey: 'examples.field.copy.title2',
    description: 'Explicit control props can override field defaults.',
    descriptionTranslationKey: 'examples.field.copy.description2',
    Component: FieldStatesExample,
    source: createExampleSource(source2),
    styleSource: style2,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
