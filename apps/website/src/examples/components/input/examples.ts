import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import InputClearableExample from './InputClearableExample';
import inputClearableStyles from './InputClearableExample.module.scss?virgo-raw';
import inputClearableSource from './InputClearableExample.tsx?raw';
import InputContentExample from './InputContentExample';
import inputContentStyles from './InputContentExample.module.scss?virgo-raw';
import inputContentSource from './InputContentExample.tsx?raw';
import InputDecorationsExample from './InputDecorationsExample';
import inputDecorationsStyles from './InputDecorationsExample.module.scss?virgo-raw';
import inputDecorationsSource from './InputDecorationsExample.tsx?raw';
import InputPasswordExample from './InputPasswordExample';
import inputPasswordStyles from './InputPasswordExample.module.scss?virgo-raw';
import inputPasswordSource from './InputPasswordExample.tsx?raw';
import InputSizesExample from './InputSizesExample';
import inputSizesStyles from './InputSizesExample.module.scss?virgo-raw';
import inputSizesSource from './InputSizesExample.tsx?raw';
import InputStatesExample from './InputStatesExample';
import inputStatesStyles from './InputStatesExample.module.scss?virgo-raw';
import inputStatesSource from './InputStatesExample.tsx?raw';
import TextareaSizesExample from './TextareaSizesExample';
import textareaSizesStyles from './TextareaSizesExample.module.scss?virgo-raw';
import textareaSizesSource from './TextareaSizesExample.tsx?raw';
import TextareaStatesExample from './TextareaStatesExample';
import textareaStatesStyles from './TextareaStatesExample.module.scss?virgo-raw';
import textareaStatesSource from './TextareaStatesExample.tsx?raw';

export const inputExamples = {
  inputSizes: {
    id: 'input-sizes',
    title: 'Input sizes',
    description: 'Four control heights share one text-entry contract.',
    Component: InputSizesExample,
    source: inputSizesSource,
    styleSource: inputSizesStyles,
  },
  inputContent: {
    id: 'input-content',
    title: 'Placeholder and value',
    description: 'Empty hints and editable default values use native input semantics.',
    Component: InputContentExample,
    source: inputContentSource,
    styleSource: inputContentStyles,
  },
  inputDecorations: {
    id: 'input-decorations',
    title: 'Prefix and suffix',
    description: 'Decorative icons stay outside the tab order.',
    Component: InputDecorationsExample,
    source: inputDecorationsSource,
    styleSource: inputDecorationsStyles,
  },
  inputClearable: {
    id: 'input-clearable',
    title: 'Clearable input',
    description: 'Clear the current value while retaining typing focus.',
    Component: InputClearableExample,
    source: inputClearableSource,
    styleSource: inputClearableStyles,
  },
  inputPassword: {
    id: 'input-password',
    title: 'Password reveal',
    description: 'Toggle visibility without replacing the entered value.',
    Component: InputPasswordExample,
    source: inputPasswordSource,
    styleSource: inputPasswordStyles,
  },
  inputStates: {
    id: 'input-states',
    title: 'Input states',
    description: 'Default, disabled, read-only, and invalid states share native text semantics.',
    Component: InputStatesExample,
    source: inputStatesSource,
    styleSource: inputStatesStyles,
  },
  textareaSizes: {
    id: 'textarea-sizes',
    title: 'Textarea sizes',
    description: 'Density and minimum height vary; rows still describe content.',
    Component: TextareaSizesExample,
    source: textareaSizesSource,
    styleSource: textareaSizesStyles,
  },
  textareaStates: {
    id: 'textarea-states',
    title: 'Textarea states',
    description: 'Multiline content reuses the Input family’s state language.',
    Component: TextareaStatesExample,
    source: textareaStatesSource,
    styleSource: textareaStatesStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
