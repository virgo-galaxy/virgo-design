import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

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
    titleTranslationKey: 'examples.select.copy.triggerSizes',
    description: 'The listbox follows the trigger’s density.',
    descriptionTranslationKey: 'examples.select.copy.theListboxFollowsTheTriggerSDensity',
    Component: SelectSizesExample,
    source: createExampleSource(selectSizesSource),
    styleSource: selectSizesStyles,
  },
  selectContent: {
    id: 'select-content',
    title: 'Placeholder and value',
    titleTranslationKey: 'examples.select.copy.placeholderAndValue',
    description: 'The selected option is the source of the trigger’s display text.',
    descriptionTranslationKey: 'examples.select.copy.theSelectedOptionIsTheSourceOfTheTriggerS',
    Component: SelectContentExample,
    source: createExampleSource(selectContentSource),
    styleSource: selectContentStyles,
  },
  selectStates: {
    id: 'select-states',
    title: 'Selection states',
    titleTranslationKey: 'examples.select.copy.selectionStates',
    description: 'Default, disabled, and invalid triggers retain the same listbox model.',
    descriptionTranslationKey:
      'examples.select.copy.defaultDisabledAndInvalidTriggersRetainTheSameListboxModel',
    Component: SelectStatesExample,
    source: createExampleSource(selectStatesSource),
    styleSource: selectStatesStyles,
  },
  selectDisabledOption: {
    id: 'select-disabled-option',
    title: 'Disabled options',
    titleTranslationKey: 'examples.select.copy.disabledOptions',
    description: 'Keep an unavailable destination in context without allowing selection.',
    descriptionTranslationKey:
      'examples.select.copy.keepAnUnavailableDestinationInContextWithoutAllowingSelection',
    Component: SelectDisabledOptionExample,
    source: createExampleSource(selectDisabledOptionSource),
    styleSource: selectDisabledOptionStyles,
  },
  selectLongContent: {
    id: 'select-long-content',
    title: 'Long content',
    titleTranslationKey: 'examples.select.copy.longContent',
    description: 'Constrain the trigger while preserving complete option labels.',
    descriptionTranslationKey:
      'examples.select.copy.constrainTheTriggerWhilePreservingCompleteOptionLabels',
    Component: SelectLongContentExample,
    source: createExampleSource(selectLongContentSource),
    styleSource: selectLongContentStyles,
  },
  selectKeyboard: {
    id: 'select-keyboard',
    title: 'Keyboard selection',
    titleTranslationKey: 'examples.select.copy.keyboardSelection',
    description: 'Focus the trigger; use ArrowDown, Home/End, Enter, and Escape.',
    descriptionTranslationKey:
      'examples.select.copy.focusTheTriggerUseArrowdownHomeEndEnterAndEscape',
    Component: SelectKeyboardExample,
    source: createExampleSource(selectKeyboardSource),
    styleSource: selectKeyboardStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
