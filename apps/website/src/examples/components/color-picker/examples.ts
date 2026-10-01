import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import ColorPickerControlledExample from './ColorPickerControlledExample';
import style0 from './ColorPickerControlledExample.module.scss?virgo-raw';
import source0 from './ColorPickerControlledExample.tsx?raw';
import ColorPickerStatesExample from './ColorPickerStatesExample';
import style1 from './ColorPickerStatesExample.module.scss?virgo-raw';
import source1 from './ColorPickerStatesExample.tsx?raw';
export const colorPickerExamples = {
  example0: {
    id: 'color-picker-controlled',
    title: 'Native picker and swatches',
    titleTranslationKey: 'examples.colorPicker.copy.title0',
    description: 'A single HEX value connects the native control, swatches and preview.',
    descriptionTranslationKey: 'examples.colorPicker.copy.description0',
    Component: ColorPickerControlledExample,
    source: createExampleSource(source0),
    styleSource: style0,
  },
  example1: {
    id: 'color-picker-states',
    title: 'Size and read-only states',
    titleTranslationKey: 'examples.colorPicker.copy.title1',
    description: 'Field inheritance prevents native picking and swatch changes.',
    descriptionTranslationKey: 'examples.colorPicker.copy.description1',
    Component: ColorPickerStatesExample,
    source: createExampleSource(source1),
    styleSource: style1,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
