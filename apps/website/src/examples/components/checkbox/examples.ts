import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import CheckboxBasicExample from './CheckboxBasicExample';
import checkboxBasicStyles from './CheckboxBasicExample.module.scss?virgo-raw';
import checkboxBasicSource from './CheckboxBasicExample.tsx?raw';
import CheckboxCheckAllExample from './CheckboxCheckAllExample';
import checkboxCheckAllStyles from './CheckboxCheckAllExample.module.scss?virgo-raw';
import checkboxCheckAllSource from './CheckboxCheckAllExample.tsx?raw';
import CheckboxDisabledExample from './CheckboxDisabledExample';
import checkboxDisabledStyles from './CheckboxDisabledExample.module.scss?virgo-raw';
import checkboxDisabledSource from './CheckboxDisabledExample.tsx?raw';
import CheckboxGroupExample from './CheckboxGroupExample';
import checkboxGroupStyles from './CheckboxGroupExample.module.scss?virgo-raw';
import checkboxGroupSource from './CheckboxGroupExample.tsx?raw';

export const checkboxExamples = {
  checkboxBasic: {
    id: 'checkbox-basic',
    title: 'Selection states',
    titleTranslationKey: 'examples.checkbox.copy.selectionStates',
    description: 'Unchecked, checked, and indeterminate choices use the same geometry.',
    descriptionTranslationKey:
      'examples.checkbox.copy.uncheckedCheckedAndIndeterminateChoicesUseTheSameGeometry',
    Component: CheckboxBasicExample,
    source: createExampleSource(checkboxBasicSource),
    styleSource: checkboxBasicStyles,
  },
  checkboxDisabled: {
    id: 'checkbox-disabled',
    title: 'Disabled selection',
    titleTranslationKey: 'examples.checkbox.copy.disabledSelection',
    description: 'Disabled preserves all three selection states.',
    descriptionTranslationKey: 'examples.checkbox.copy.disabledPreservesAllThreeSelectionStates',
    Component: CheckboxDisabledExample,
    source: createExampleSource(checkboxDisabledSource),
    styleSource: checkboxDisabledStyles,
  },
  checkboxGroup: {
    id: 'checkbox-group',
    title: 'Multiple values',
    titleTranslationKey: 'examples.checkbox.copy.multipleValues',
    description: 'A group coordinates related native checkbox values.',
    descriptionTranslationKey:
      'examples.checkbox.copy.aGroupCoordinatesRelatedNativeCheckboxValues',
    Component: CheckboxGroupExample,
    source: createExampleSource(checkboxGroupSource),
    styleSource: checkboxGroupStyles,
  },
  checkboxCheckAll: {
    id: 'checkbox-check-all',
    title: 'Check all',
    titleTranslationKey: 'examples.checkbox.copy.checkAll',
    description: 'Compute the aggregate state from the selected values.',
    descriptionTranslationKey:
      'examples.checkbox.copy.computeTheAggregateStateFromTheSelectedValues',
    Component: CheckboxCheckAllExample,
    source: createExampleSource(checkboxCheckAllSource),
    styleSource: checkboxCheckAllStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
