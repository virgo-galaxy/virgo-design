import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import ColorPickerControlledExample from './ColorPickerControlledExample';
import source0 from './ColorPickerControlledExample.tsx?raw';
import ColorPickerPanelExample from './ColorPickerPanelExample';
import source2 from './ColorPickerPanelExample.tsx?raw';
import ColorPickerSimpleExample from './ColorPickerSimpleExample';
import source3 from './ColorPickerSimpleExample.tsx?raw';
import ColorPickerStatesExample from './ColorPickerStatesExample';
import source1 from './ColorPickerStatesExample.tsx?raw';

import style0 from './ColorPickerControlledExample.module.scss?virgo-raw';
import style2 from './ColorPickerPanelExample.module.scss?virgo-raw';
import style3 from './ColorPickerSimpleExample.module.scss?virgo-raw';
import style1 from './ColorPickerStatesExample.module.scss?virgo-raw';
export const colorPickerExamples = {
  example3: {
    id: 'color-picker-simple',
    title: 'Simple HEX panel',
    titleTranslationKey: 'examples.colorPicker.copy.title3',
    description: 'A compact built-in panel for saturation, brightness, hue and HEX editing.',
    descriptionTranslationKey: 'examples.colorPicker.copy.description3',
    Component: ColorPickerSimpleExample,
    source: createExampleSource(source3),
    styleSource: style3,
  },
  example2: {
    id: 'color-picker-panel',
    title: 'Swatch and value triggers',
    titleTranslationKey: 'examples.colorPicker.copy.title2',
    description: 'Two trigger variants share HEX/RGB editing, hue and opacity controls.',
    descriptionTranslationKey: 'examples.colorPicker.copy.description2',
    Component: ColorPickerPanelExample,
    source: createExampleSource(source2),
    styleSource: style2,
  },
  example0: {
    id: 'color-picker-controlled',
    title: 'Color picker and swatches',
    titleTranslationKey: 'examples.colorPicker.copy.title0',
    description: 'A shared HEX value connects the built-in panel, value trigger and swatches.',
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
