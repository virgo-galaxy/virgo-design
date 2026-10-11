import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import TimePickerControlledExample from './TimePickerControlledExample';
import style0 from './TimePickerControlledExample.module.scss?virgo-raw';
import source0 from './TimePickerControlledExample.tsx?raw';
import TimePickerStatesExample from './TimePickerStatesExample';
import style1 from './TimePickerStatesExample.module.scss?virgo-raw';
import source1 from './TimePickerStatesExample.tsx?raw';
export const timePickerExamples = {
  example0: {
    id: 'time-picker-controlled',
    title: 'Local time and precision',
    titleTranslationKey: 'examples.timePicker.copy.title0',
    description: 'Values use HH:mm; native min/max/step remain available.',
    descriptionTranslationKey: 'examples.timePicker.copy.description0',
    Component: TimePickerControlledExample,
    source: createExampleSource(source0),
    styleSource: style0,
  },
  example1: {
    id: 'time-picker-states',
    title: 'Seconds and field states',
    titleTranslationKey: 'examples.timePicker.copy.title1',
    description:
      'Use showSeconds and optional clear/confirm actions; native step precision remains available.',
    descriptionTranslationKey: 'examples.timePicker.copy.description1',
    Component: TimePickerStatesExample,
    source: createExampleSource(source1),
    styleSource: style1,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
