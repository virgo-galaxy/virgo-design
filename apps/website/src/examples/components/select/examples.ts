import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import SelectContentExample from './SelectContentExample';
import selectContentSource from './SelectContentExample.tsx?raw';
import SelectDisabledOptionExample from './SelectDisabledOptionExample';
import selectDisabledOptionSource from './SelectDisabledOptionExample.tsx?raw';
import SelectKeyboardExample from './SelectKeyboardExample';
import selectKeyboardSource from './SelectKeyboardExample.tsx?raw';
import SelectLongContentExample from './SelectLongContentExample';
import selectLongContentSource from './SelectLongContentExample.tsx?raw';
import SelectSizesExample from './SelectSizesExample';
import selectSizesSource from './SelectSizesExample.tsx?raw';
import SelectStatesExample from './SelectStatesExample';
import selectStatesSource from './SelectStatesExample.tsx?raw';

export const selectExamples = {
  selectSizes: {
    id: 'select-sizes',
    title: 'Trigger sizes',
    description: 'The listbox follows the trigger’s density.',
    Component: SelectSizesExample,
    source: selectSizesSource,
  },
  selectContent: {
    id: 'select-content',
    title: 'Placeholder and value',
    description: 'The selected option is the source of the trigger’s display text.',
    Component: SelectContentExample,
    source: selectContentSource,
  },
  selectStates: {
    id: 'select-states',
    title: 'Selection states',
    description: 'Default, disabled, and invalid triggers retain the same listbox model.',
    Component: SelectStatesExample,
    source: selectStatesSource,
  },
  selectDisabledOption: {
    id: 'select-disabled-option',
    title: 'Disabled options',
    description: 'Keep an unavailable destination in context without allowing selection.',
    Component: SelectDisabledOptionExample,
    source: selectDisabledOptionSource,
  },
  selectLongContent: {
    id: 'select-long-content',
    title: 'Long content',
    description: 'Constrain the trigger while preserving complete option labels.',
    Component: SelectLongContentExample,
    source: selectLongContentSource,
  },
  selectKeyboard: {
    id: 'select-keyboard',
    title: 'Keyboard selection',
    description: 'Focus the trigger; use ArrowDown, Home/End, Enter, and Escape.',
    Component: SelectKeyboardExample,
    source: selectKeyboardSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
