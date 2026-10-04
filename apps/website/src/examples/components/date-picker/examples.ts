import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import DatePickerBasicExample from './DatePickerBasicExample';
import style0 from './DatePickerBasicExample.module.scss?virgo-raw';
import source0 from './DatePickerBasicExample.tsx?raw';
import DatePickerRangeExample from './DatePickerRangeExample';
import rangeStyle from './DatePickerRangeExample.module.scss?virgo-raw';
import rangeSource from './DatePickerRangeExample.tsx?raw';
import DatePickerStatesExample from './DatePickerStatesExample';
import style1 from './DatePickerStatesExample.module.scss?virgo-raw';
import source1 from './DatePickerStatesExample.tsx?raw';
export const datePickerExamples = {
  example0: {
    id: 'date-picker-basic',
    title: 'Input and calendar popup',
    titleTranslationKey: 'examples.datePicker.copy.title0',
    description: 'Native date entry and calendar selection share one value.',
    descriptionTranslationKey: 'examples.datePicker.copy.description0',
    Component: DatePickerBasicExample,
    source: createExampleSource(source0),
    styleSource: style0,
  },
  example2: {
    id: 'date-picker-range',
    title: 'Date range',
    titleTranslationKey: 'examples.datePicker.copy.title2',
    description: 'Two adjacent months share an inclusive date range with typed endpoints.',
    descriptionTranslationKey: 'examples.datePicker.copy.description2',
    Component: DatePickerRangeExample,
    source: createExampleSource(rangeSource),
    styleSource: rangeStyle,
  },
  example1: {
    id: 'date-picker-states',
    title: 'Read-only and disabled dates',
    titleTranslationKey: 'examples.datePicker.copy.title1',
    description: 'The whole picker inherits Field state.',
    descriptionTranslationKey: 'examples.datePicker.copy.description1',
    Component: DatePickerStatesExample,
    source: createExampleSource(source1),
    styleSource: style1,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
