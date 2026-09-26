import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import CheckboxBasicExample from './CheckboxBasicExample';
import checkboxBasicSource from './CheckboxBasicExample.tsx?raw';
import CheckboxCheckAllExample from './CheckboxCheckAllExample';
import checkboxCheckAllSource from './CheckboxCheckAllExample.tsx?raw';
import CheckboxDisabledExample from './CheckboxDisabledExample';
import checkboxDisabledSource from './CheckboxDisabledExample.tsx?raw';
import CheckboxGroupExample from './CheckboxGroupExample';
import checkboxGroupSource from './CheckboxGroupExample.tsx?raw';

export const checkboxExamples = {
  checkboxBasic: {
    id: 'checkbox-basic',
    title: 'Selection states',
    description: 'Unchecked, checked, and indeterminate choices use the same geometry.',
    Component: CheckboxBasicExample,
    source: checkboxBasicSource,
  },
  checkboxDisabled: {
    id: 'checkbox-disabled',
    title: 'Disabled selection',
    description: 'Disabled preserves all three selection states.',
    Component: CheckboxDisabledExample,
    source: checkboxDisabledSource,
  },
  checkboxGroup: {
    id: 'checkbox-group',
    title: 'Multiple values',
    description: 'A group coordinates related native checkbox values.',
    Component: CheckboxGroupExample,
    source: checkboxGroupSource,
  },
  checkboxCheckAll: {
    id: 'checkbox-check-all',
    title: 'Check all',
    description: 'Compute the aggregate state from the selected values.',
    Component: CheckboxCheckAllExample,
    source: checkboxCheckAllSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
