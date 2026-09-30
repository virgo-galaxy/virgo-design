import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import PopoverClickExample from './PopoverClickExample';
import popoverClickStyles from './PopoverClickExample.module.scss?virgo-raw';
import popoverClickSource from './PopoverClickExample.tsx?raw';
import PopoverCustomTriggerExample from './PopoverCustomTriggerExample';
import popoverCustomTriggerStyles from './PopoverCustomTriggerExample.module.scss?virgo-raw';
import popoverCustomTriggerSource from './PopoverCustomTriggerExample.tsx?raw';
import PopoverDisabledExample from './PopoverDisabledExample';
import popoverDisabledStyles from './PopoverDisabledExample.module.scss?virgo-raw';
import popoverDisabledSource from './PopoverDisabledExample.tsx?raw';
import PopoverFormExample from './PopoverFormExample';
import popoverFormStyles from './PopoverFormExample.module.scss?virgo-raw';
import popoverFormSource from './PopoverFormExample.tsx?raw';
import PopoverHoverExample from './PopoverHoverExample';
import popoverHoverStyles from './PopoverHoverExample.module.scss?virgo-raw';
import popoverHoverSource from './PopoverHoverExample.tsx?raw';
import PopoverNestedMenuExample from './PopoverNestedMenuExample';
import popoverNestedMenuStyles from './PopoverNestedMenuExample.module.scss?virgo-raw';
import popoverNestedMenuSource from './PopoverNestedMenuExample.tsx?raw';
import PopoverPlacementExample from './PopoverPlacementExample';
import popoverPlacementStyles from './PopoverPlacementExample.module.scss?virgo-raw';
import popoverPlacementSource from './PopoverPlacementExample.tsx?raw';

export const popoverExamples = {
  popoverClick: {
    id: 'popover-click',
    title: 'Click details',
    titleTranslationKey: 'examples.popover.copy.clickDetails',
    description: 'A non-modal panel stays connected to its trigger.',
    descriptionTranslationKey: 'examples.popover.copy.aNonModalPanelStaysConnectedToItsTrigger',
    Component: PopoverClickExample,
    source: createExampleSource(popoverClickSource),
    styleSource: popoverClickStyles,
  },
  popoverHover: {
    id: 'popover-hover',
    title: 'Hover details',
    titleTranslationKey: 'examples.popover.copy.hoverDetails',
    description: 'A non-modal panel stays connected to its trigger.',
    descriptionTranslationKey: 'examples.popover.copy.aNonModalPanelStaysConnectedToItsTrigger',
    Component: PopoverHoverExample,
    source: createExampleSource(popoverHoverSource),
    styleSource: popoverHoverStyles,
  },
  popoverDisabled: {
    id: 'popover-disabled',
    title: 'Disabled popover',
    titleTranslationKey: 'examples.popover.copy.disabledPopover',
    description: 'The root prevents disclosure while disabled.',
    descriptionTranslationKey: 'examples.popover.copy.theRootPreventsDisclosureWhileDisabled',
    Component: PopoverDisabledExample,
    source: createExampleSource(popoverDisabledSource),
    styleSource: popoverDisabledStyles,
  },
  popoverCustomTrigger: {
    id: 'popover-custom-trigger',
    title: 'Custom trigger',
    titleTranslationKey: 'examples.popover.copy.customTrigger',
    description: 'A native button forwards all trigger props and ref.',
    descriptionTranslationKey: 'examples.popover.copy.aNativeButtonForwardsAllTriggerPropsAndRef',
    Component: PopoverCustomTriggerExample,
    source: createExampleSource(popoverCustomTriggerSource),
    styleSource: popoverCustomTriggerStyles,
  },
  popoverForm: {
    id: 'popover-form',
    title: 'Edit in context',
    titleTranslationKey: 'examples.popover.copy.editInContext',
    description: 'Save updates the example’s own state and returns focus to its trigger.',
    descriptionTranslationKey:
      'examples.popover.copy.saveUpdatesTheExampleSOwnStateAndReturnsFocus',
    Component: PopoverFormExample,
    source: createExampleSource(popoverFormSource),
    styleSource: popoverFormStyles,
  },
  popoverPlacement: {
    id: 'popover-placement',
    title: 'Placement and offset',
    titleTranslationKey: 'examples.popover.copy.placementAndOffset',
    description: 'Twelve positions with a 12px offset and optional arrow.',
    descriptionTranslationKey:
      'examples.popover.copy.twelvePositionsWithA12pxOffsetAndOptionalArrow',
    Component: PopoverPlacementExample,
    source: createExampleSource(popoverPlacementSource),
    styleSource: popoverPlacementStyles,
  },
  popoverNestedMenu: {
    id: 'popover-nested-menu',
    title: 'Nested menu',
    titleTranslationKey: 'examples.popover.copy.nestedMenu',
    description: 'Escape closes the child menu before its parent panel.',
    descriptionTranslationKey: 'examples.popover.copy.escapeClosesTheChildMenuBeforeItsParentPanel',
    Component: PopoverNestedMenuExample,
    source: createExampleSource(popoverNestedMenuSource),
    styleSource: popoverNestedMenuStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
