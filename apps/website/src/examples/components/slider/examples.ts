import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import SliderControlledExample from './SliderControlledExample';
import source0 from './SliderControlledExample.tsx?raw';
import SliderRangeExample from './SliderRangeExample';
import source2 from './SliderRangeExample.tsx?raw';
import SliderStepsExample from './SliderStepsExample';
import source1 from './SliderStepsExample.tsx?raw';

import style0 from './SliderControlledExample.module.scss?virgo-raw';
import style2 from './SliderRangeExample.module.scss?virgo-raw';
import style1 from './SliderStepsExample.module.scss?virgo-raw';
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
  example2: {
    id: 'slider-range',
    title: 'Range and bounded value',
    titleTranslationKey: 'examples.slider.copy.title2',
    description: 'Two or three ordered thumbs with independent keyboard bounds.',
    descriptionTranslationKey: 'examples.slider.copy.description2',
    Component: SliderRangeExample,
    source: createExampleSource(source2),
    styleSource: style2,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
