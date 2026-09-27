import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import RadioBasicExample from './RadioBasicExample';
import radioBasicStyles from './RadioBasicExample.module.scss?virgo-raw';
import radioBasicSource from './RadioBasicExample.tsx?raw';
import RadioDisabledExample from './RadioDisabledExample';
import radioDisabledStyles from './RadioDisabledExample.module.scss?virgo-raw';
import radioDisabledSource from './RadioDisabledExample.tsx?raw';
import RadioHorizontalExample from './RadioHorizontalExample';
import radioHorizontalStyles from './RadioHorizontalExample.module.scss?virgo-raw';
import radioHorizontalSource from './RadioHorizontalExample.tsx?raw';
import RadioVerticalExample from './RadioVerticalExample';
import radioVerticalStyles from './RadioVerticalExample.module.scss?virgo-raw';
import radioVerticalSource from './RadioVerticalExample.tsx?raw';

export const radioExamples = {
  radioBasic: {
    id: 'radio-basic',
    title: 'Native radio selection',
    description: 'A native name groups mutually exclusive options.',
    Component: RadioBasicExample,
    source: radioBasicSource,
    styleSource: radioBasicStyles,
  },
  radioHorizontal: {
    id: 'radio-horizontal',
    title: 'Horizontal group',
    description: 'Group choices without changing single-selection semantics.',
    Component: RadioHorizontalExample,
    source: radioHorizontalSource,
    styleSource: radioHorizontalStyles,
  },
  radioVertical: {
    id: 'radio-vertical',
    title: 'Vertical group',
    description: 'Group choices without changing single-selection semantics.',
    Component: RadioVerticalExample,
    source: radioVerticalSource,
    styleSource: radioVerticalStyles,
  },
  radioDisabled: {
    id: 'radio-disabled',
    title: 'Disabled selection',
    description: 'Disabled options preserve their selection state.',
    Component: RadioDisabledExample,
    source: radioDisabledSource,
    styleSource: radioDisabledStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
