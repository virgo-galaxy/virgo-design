import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import SliderControlledExample from './SliderControlledExample';
import style0 from './SliderControlledExample.module.scss?virgo-raw';
import source0 from './SliderControlledExample.tsx?raw';
import SliderStepsExample from './SliderStepsExample';
import style1 from './SliderStepsExample.module.scss?virgo-raw';
import source1 from './SliderStepsExample.tsx?raw';
export const sliderExamples = {
  example0: {
    id: 'slider-controlled',
    title: 'Controlled value',
    titleTranslationKey: 'examples.slider.copy.title0',
    description: 'Numeric changes stay owned by the example.',
    descriptionTranslationKey: 'examples.slider.copy.description0',
    Component: SliderControlledExample,
    source: createExampleSource(source0),
    styleSource: style0,
  },
  example1: {
    id: 'slider-steps',
    title: 'Steps and states',
    titleTranslationKey: 'examples.slider.copy.title1',
    description: 'Native bounds and read-only/disabled composition.',
    descriptionTranslationKey: 'examples.slider.copy.description1',
    Component: SliderStepsExample,
    source: createExampleSource(source1),
    styleSource: style1,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
