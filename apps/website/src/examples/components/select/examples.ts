import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import SelectContentExample from './SelectContentExample';
import selectContentStyles from './SelectContentExample.module.scss?virgo-raw';
import selectContentSource from './SelectContentExample.tsx?raw';
import SelectDisabledOptionExample from './SelectDisabledOptionExample';
import selectDisabledOptionStyles from './SelectDisabledOptionExample.module.scss?virgo-raw';
import selectDisabledOptionSource from './SelectDisabledOptionExample.tsx?raw';
import SelectKeyboardExample from './SelectKeyboardExample';
import selectKeyboardStyles from './SelectKeyboardExample.module.scss?virgo-raw';
import selectKeyboardSource from './SelectKeyboardExample.tsx?raw';
import SelectLongContentExample from './SelectLongContentExample';
import selectLongContentStyles from './SelectLongContentExample.module.scss?virgo-raw';
import selectLongContentSource from './SelectLongContentExample.tsx?raw';
import SelectSizesExample from './SelectSizesExample';
import selectSizesStyles from './SelectSizesExample.module.scss?virgo-raw';
import selectSizesSource from './SelectSizesExample.tsx?raw';
import SelectStatesExample from './SelectStatesExample';
import selectStatesStyles from './SelectStatesExample.module.scss?virgo-raw';
import selectStatesSource from './SelectStatesExample.tsx?raw';

export const selectExamples = {
  selectSizes: {
    id: 'select-sizes',
    title: 'Trigger sizes',
    description: 'The listbox follows the trigger’s density.',
    Component: SelectSizesExample,
    source: selectSizesSource,
    styleSource: selectSizesStyles,
  },
  selectContent: {
    id: 'select-content',
    title: 'Placeholder and value',
    description: 'The selected option is the source of the trigger’s display text.',
    Component: SelectContentExample,
    source: selectContentSource,
    styleSource: selectContentStyles,
  },
  selectStates: {
    id: 'select-states',
    title: 'Selection states',
    description: 'Default, disabled, and invalid triggers retain the same listbox model.',
    Component: SelectStatesExample,
    source: selectStatesSource,
    styleSource: selectStatesStyles,
  },
  selectDisabledOption: {
    id: 'select-disabled-option',
    title: 'Disabled options',
    description: 'Keep an unavailable destination in context without allowing selection.',
    Component: SelectDisabledOptionExample,
    source: selectDisabledOptionSource,
    styleSource: selectDisabledOptionStyles,
  },
  selectLongContent: {
    id: 'select-long-content',
    title: 'Long content',
    description: 'Constrain the trigger while preserving complete option labels.',
    Component: SelectLongContentExample,
    source: selectLongContentSource,
    styleSource: selectLongContentStyles,
  },
  selectKeyboard: {
    id: 'select-keyboard',
    title: 'Keyboard selection',
    description: 'Focus the trigger; use ArrowDown, Home/End, Enter, and Escape.',
    Component: SelectKeyboardExample,
    source: selectKeyboardSource,
    styleSource: selectKeyboardStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
