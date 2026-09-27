import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

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
    description: 'A non-modal panel stays connected to its trigger.',
    Component: PopoverClickExample,
    source: popoverClickSource,
    styleSource: popoverClickStyles,
  },
  popoverHover: {
    id: 'popover-hover',
    title: 'Hover details',
    description: 'A non-modal panel stays connected to its trigger.',
    Component: PopoverHoverExample,
    source: popoverHoverSource,
    styleSource: popoverHoverStyles,
  },
  popoverDisabled: {
    id: 'popover-disabled',
    title: 'Disabled popover',
    description: 'The root prevents disclosure while disabled.',
    Component: PopoverDisabledExample,
    source: popoverDisabledSource,
    styleSource: popoverDisabledStyles,
  },
  popoverCustomTrigger: {
    id: 'popover-custom-trigger',
    title: 'Custom trigger',
    description: 'A native button forwards all trigger props and ref.',
    Component: PopoverCustomTriggerExample,
    source: popoverCustomTriggerSource,
    styleSource: popoverCustomTriggerStyles,
  },
  popoverForm: {
    id: 'popover-form',
    title: 'Edit in context',
    description: 'Save updates the example’s own state and returns focus to its trigger.',
    Component: PopoverFormExample,
    source: popoverFormSource,
    styleSource: popoverFormStyles,
  },
  popoverPlacement: {
    id: 'popover-placement',
    title: 'Placement and offset',
    description: 'Twelve positions with a 12px offset and optional arrow.',
    Component: PopoverPlacementExample,
    source: popoverPlacementSource,
    styleSource: popoverPlacementStyles,
  },
  popoverNestedMenu: {
    id: 'popover-nested-menu',
    title: 'Nested menu',
    description: 'Escape closes the child menu before its parent panel.',
    Component: PopoverNestedMenuExample,
    source: popoverNestedMenuSource,
    styleSource: popoverNestedMenuStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
