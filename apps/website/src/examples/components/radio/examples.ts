import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

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
    titleTranslationKey: 'examples.radio.copy.nativeRadioSelection',
    description: 'A native name groups mutually exclusive options.',
    descriptionTranslationKey: 'examples.radio.copy.aNativeNameGroupsMutuallyExclusiveOptions',
    Component: RadioBasicExample,
    source: createExampleSource(radioBasicSource),
    styleSource: radioBasicStyles,
  },
  radioHorizontal: {
    id: 'radio-horizontal',
    title: 'Horizontal group',
    titleTranslationKey: 'examples.radio.copy.horizontalGroup',
    description: 'Group choices without changing single-selection semantics.',
    descriptionTranslationKey:
      'examples.radio.copy.groupChoicesWithoutChangingSingleSelectionSemantics',
    Component: RadioHorizontalExample,
    source: createExampleSource(radioHorizontalSource),
    styleSource: radioHorizontalStyles,
  },
  radioVertical: {
    id: 'radio-vertical',
    title: 'Vertical group',
    titleTranslationKey: 'examples.radio.copy.verticalGroup',
    description: 'Group choices without changing single-selection semantics.',
    descriptionTranslationKey:
      'examples.radio.copy.groupChoicesWithoutChangingSingleSelectionSemantics',
    Component: RadioVerticalExample,
    source: createExampleSource(radioVerticalSource),
    styleSource: radioVerticalStyles,
  },
  radioDisabled: {
    id: 'radio-disabled',
    title: 'Disabled selection',
    titleTranslationKey: 'examples.radio.copy.disabledSelection',
    description: 'Disabled options preserve their selection state.',
    descriptionTranslationKey: 'examples.radio.copy.disabledOptionsPreserveTheirSelectionState',
    Component: RadioDisabledExample,
    source: createExampleSource(radioDisabledSource),
    styleSource: radioDisabledStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
