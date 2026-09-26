import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import InputClearableExample from './InputClearableExample';
import inputClearableSource from './InputClearableExample.tsx?raw';
import InputContentExample from './InputContentExample';
import inputContentSource from './InputContentExample.tsx?raw';
import InputDecorationsExample from './InputDecorationsExample';
import inputDecorationsSource from './InputDecorationsExample.tsx?raw';
import InputPasswordExample from './InputPasswordExample';
import inputPasswordSource from './InputPasswordExample.tsx?raw';
import InputSizesExample from './InputSizesExample';
import inputSizesSource from './InputSizesExample.tsx?raw';
import InputStatesExample from './InputStatesExample';
import inputStatesSource from './InputStatesExample.tsx?raw';
import TextareaSizesExample from './TextareaSizesExample';
import textareaSizesSource from './TextareaSizesExample.tsx?raw';
import TextareaStatesExample from './TextareaStatesExample';
import textareaStatesSource from './TextareaStatesExample.tsx?raw';

export const inputExamples = {
  inputSizes: {
    id: 'input-sizes',
    title: 'Input sizes',
    description: 'Four control heights share one text-entry contract.',
    Component: InputSizesExample,
    source: inputSizesSource,
  },
  inputContent: {
    id: 'input-content',
    title: 'Placeholder and value',
    description: 'Empty hints and editable default values use native input semantics.',
    Component: InputContentExample,
    source: inputContentSource,
  },
  inputDecorations: {
    id: 'input-decorations',
    title: 'Prefix and suffix',
    description: 'Decorative icons stay outside the tab order.',
    Component: InputDecorationsExample,
    source: inputDecorationsSource,
  },
  inputClearable: {
    id: 'input-clearable',
    title: 'Clearable input',
    description: 'Clear the current value while retaining typing focus.',
    Component: InputClearableExample,
    source: inputClearableSource,
  },
  inputPassword: {
    id: 'input-password',
    title: 'Password reveal',
    description: 'Toggle visibility without replacing the entered value.',
    Component: InputPasswordExample,
    source: inputPasswordSource,
  },
  inputStates: {
    id: 'input-states',
    title: 'Input states',
    description: 'Default, disabled, read-only, and invalid states share native text semantics.',
    Component: InputStatesExample,
    source: inputStatesSource,
  },
  textareaSizes: {
    id: 'textarea-sizes',
    title: 'Textarea sizes',
    description: 'Density and minimum height vary; rows still describe content.',
    Component: TextareaSizesExample,
    source: textareaSizesSource,
  },
  textareaStates: {
    id: 'textarea-states',
    title: 'Textarea states',
    description: 'Multiline content reuses the Input family’s state language.',
    Component: TextareaStatesExample,
    source: textareaStatesSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
