import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import ComboboxAutocompleteExample from './ComboboxAutocompleteExample';
import source1 from './ComboboxAutocompleteExample.tsx?raw';
import ComboboxBasicExample from './ComboboxBasicExample';
import source0 from './ComboboxBasicExample.tsx?raw';
import ComboboxControlledExample from './ComboboxControlledExample';
import source2 from './ComboboxControlledExample.tsx?raw';
import ComboboxGroupsExample from './ComboboxGroupsExample';
import source3 from './ComboboxGroupsExample.tsx?raw';

import style1 from './ComboboxAutocompleteExample.module.scss?virgo-raw';
import style0 from './ComboboxBasicExample.module.scss?virgo-raw';
import style2 from './ComboboxControlledExample.module.scss?virgo-raw';
import style3 from './ComboboxGroupsExample.module.scss?virgo-raw';
export const comboboxExamples = {
  example0: {
    id: 'combobox-basic',
    title: 'Search and select',
    titleTranslationKey: 'examples.combobox.copy.title0',
    description: 'Typing filters options; selection fills the input.',
    descriptionTranslationKey: 'examples.combobox.copy.description0',
    Component: ComboboxBasicExample,
    source: createExampleSource(source0),
    styleSource: style0,
  },
  example1: {
    id: 'combobox-autocomplete',
    title: 'Autocomplete pattern',
    titleTranslationKey: 'examples.combobox.copy.title1',
    description:
      'The consumer supplies suggestions and owns the query without a second interaction core.',
    descriptionTranslationKey: 'examples.combobox.copy.description1',
    Component: ComboboxAutocompleteExample,
    source: createExampleSource(source1),
    styleSource: style1,
  },
  example2: {
    id: 'combobox-controlled',
    title: 'Controlled value and popup',
    titleTranslationKey: 'examples.combobox.copy.title2',
    description: 'Input text, selection and popup state are independent.',
    descriptionTranslationKey: 'examples.combobox.copy.description2',
    Component: ComboboxControlledExample,
    source: createExampleSource(source2),
    styleSource: style2,
  },
  example3: {
    id: 'combobox-groups',
    title: 'Grouped options',
    titleTranslationKey: 'examples.combobox.copy.title3',
    description: 'Named groups share the same keyboard and filtering protocol.',
    descriptionTranslationKey: 'examples.combobox.copy.description3',
    Component: ComboboxGroupsExample,
    source: createExampleSource(source3),
    styleSource: style3,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
