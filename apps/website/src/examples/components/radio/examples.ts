import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import RadioBasicExample from './RadioBasicExample';
import radioBasicSource from './RadioBasicExample.tsx?raw';
import RadioDisabledExample from './RadioDisabledExample';
import radioDisabledSource from './RadioDisabledExample.tsx?raw';
import RadioHorizontalExample from './RadioHorizontalExample';
import radioHorizontalSource from './RadioHorizontalExample.tsx?raw';
import RadioVerticalExample from './RadioVerticalExample';
import radioVerticalSource from './RadioVerticalExample.tsx?raw';

export const radioExamples = {
  radioBasic: {
    id: 'radio-basic',
    title: 'Native radio selection',
    description: 'A native name groups mutually exclusive options.',
    Component: RadioBasicExample,
    source: radioBasicSource,
  },
  radioHorizontal: {
    id: 'radio-horizontal',
    title: 'Horizontal group',
    description: 'Group choices without changing single-selection semantics.',
    Component: RadioHorizontalExample,
    source: radioHorizontalSource,
  },
  radioVertical: {
    id: 'radio-vertical',
    title: 'Vertical group',
    description: 'Group choices without changing single-selection semantics.',
    Component: RadioVerticalExample,
    source: radioVerticalSource,
  },
  radioDisabled: {
    id: 'radio-disabled',
    title: 'Disabled selection',
    description: 'Disabled options preserve their selection state.',
    Component: RadioDisabledExample,
    source: radioDisabledSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
