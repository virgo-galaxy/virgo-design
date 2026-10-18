import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import DropdownClickExample from './DropdownClickExample';
import dropdownClickSource from './DropdownClickExample.tsx?raw';
import DropdownControlledExample from './DropdownControlledExample';
import dropdownControlledSource from './DropdownControlledExample.tsx?raw';
import DropdownCustomTriggerExample from './DropdownCustomTriggerExample';
import dropdownCustomTriggerSource from './DropdownCustomTriggerExample.tsx?raw';
import DropdownDisabledExample from './DropdownDisabledExample';
import dropdownDisabledSource from './DropdownDisabledExample.tsx?raw';
import DropdownHoverExample from './DropdownHoverExample';
import dropdownHoverSource from './DropdownHoverExample.tsx?raw';
import DropdownPlacementExample from './DropdownPlacementExample';
import dropdownPlacementSource from './DropdownPlacementExample.tsx?raw';
import DropdownSizesExample from './DropdownSizesExample';
import dropdownSizesSource from './DropdownSizesExample.tsx?raw';
import DropdownSplitExample from './DropdownSplitExample';
import dropdownSplitSource from './DropdownSplitExample.tsx?raw';
import DropdownSplitStatesExample from './DropdownSplitStatesExample';
import dropdownSplitStatesSource from './DropdownSplitStatesExample.tsx?raw';

import dropdownClickStyles from './DropdownClickExample.module.scss?virgo-raw';
import dropdownControlledStyles from './DropdownControlledExample.module.scss?virgo-raw';
import dropdownCustomTriggerStyles from './DropdownCustomTriggerExample.module.scss?virgo-raw';
import dropdownDisabledStyles from './DropdownDisabledExample.module.scss?virgo-raw';
import dropdownHoverStyles from './DropdownHoverExample.module.scss?virgo-raw';
import dropdownPlacementStyles from './DropdownPlacementExample.module.scss?virgo-raw';
import dropdownSizesStyles from './DropdownSizesExample.module.scss?virgo-raw';
import dropdownSplitStyles from './DropdownSplitExample.module.scss?virgo-raw';
import dropdownSplitStatesStyles from './DropdownSplitStatesExample.module.scss?virgo-raw';

export const dropdownExamples = {
  dropdownClick: {
    id: 'dropdown-click',
    title: 'Click menu',
    titleTranslationKey: 'examples.dropdown.copy.clickMenu',
    description: 'Disabled and destructive items retain their native menu behavior.',
    descriptionTranslationKey:
      'examples.dropdown.copy.disabledAndDestructiveItemsRetainTheirNativeMenuBehavior',
    Component: DropdownClickExample,
    source: createExampleSource(dropdownClickSource),
    styleSource: dropdownClickStyles,
  },
  dropdownHover: {
    id: 'dropdown-hover',
    title: 'Hover menu',
    titleTranslationKey: 'examples.dropdown.copy.hoverMenu',
    description: 'Disabled and destructive items retain their native menu behavior.',
    descriptionTranslationKey:
      'examples.dropdown.copy.disabledAndDestructiveItemsRetainTheirNativeMenuBehavior',
    Component: DropdownHoverExample,
    source: createExampleSource(dropdownHoverSource),
    styleSource: dropdownHoverStyles,
  },
  dropdownDisabled: {
    id: 'dropdown-disabled',
    title: 'Disabled trigger',
    titleTranslationKey: 'examples.dropdown.copy.disabledTrigger',
    description: 'An unavailable root prevents the menu from opening.',
    descriptionTranslationKey: 'examples.dropdown.copy.anUnavailableRootPreventsTheMenuFromOpening',
    Component: DropdownDisabledExample,
    source: createExampleSource(dropdownDisabledSource),
    styleSource: dropdownDisabledStyles,
  },
  dropdownPlacement: {
    id: 'dropdown-placement',
    title: 'Placement and arrow',
    titleTranslationKey: 'examples.dropdown.copy.placementAndArrow',
    description: 'Twelve positions with an arrow that can be disabled independently.',
    descriptionTranslationKey:
      'examples.dropdown.copy.twelvePositionsWithAnArrowThatCanBeDisabledIndependently',
    Component: DropdownPlacementExample,
    source: createExampleSource(dropdownPlacementSource),
    styleSource: dropdownPlacementStyles,
  },
  dropdownSplit: {
    id: 'dropdown-split',
    title: 'Split button',
    titleTranslationKey: 'examples.dropdown.copy.splitButton',
    description: 'The main button acts; its neighbor opens related actions.',
    descriptionTranslationKey:
      'examples.dropdown.copy.theMainButtonActsItsNeighborOpensRelatedActions',
    Component: DropdownSplitExample,
    source: createExampleSource(dropdownSplitSource),
    styleSource: dropdownSplitStyles,
  },
  dropdownSplitStates: {
    id: 'dropdown-split-states',
    title: 'Split button states',
    titleTranslationKey: 'examples.dropdown.copy.splitButtonStates',
    description: 'Disabled and danger styles apply to the split action.',
    descriptionTranslationKey:
      'examples.dropdown.copy.disabledAndDangerStylesApplyToTheSplitAction',
    Component: DropdownSplitStatesExample,
    source: createExampleSource(dropdownSplitStatesSource),
    styleSource: dropdownSplitStatesStyles,
  },
  dropdownCustomTrigger: {
    id: 'dropdown-custom-trigger',
    title: 'Tooltip on a custom trigger',
    titleTranslationKey: 'examples.dropdown.copy.tooltipOnACustomTrigger',
    description: 'Compose descriptive help without nesting buttons.',
    descriptionTranslationKey: 'examples.dropdown.copy.composeDescriptiveHelpWithoutNestingButtons',
    Component: DropdownCustomTriggerExample,
    source: createExampleSource(dropdownCustomTriggerSource),
    styleSource: dropdownCustomTriggerStyles,
  },
  dropdownControlled: {
    id: 'dropdown-controlled',
    title: 'Controlled menu',
    titleTranslationKey: 'examples.dropdown.copy.controlledMenu',
    description: 'Keyboard navigation and open state belong to this example.',
    descriptionTranslationKey:
      'examples.dropdown.copy.keyboardNavigationAndOpenStateBelongToThisExample',
    Component: DropdownControlledExample,
    source: createExampleSource(dropdownControlledSource),
    styleSource: dropdownControlledStyles,
  },
  dropdownSizes: {
    id: 'dropdown-sizes',
    title: 'Menu density',
    titleTranslationKey: 'examples.dropdown.copy.menuDensity',
    description: 'Four trigger sizes coordinate the row and typography density.',
    descriptionTranslationKey:
      'examples.dropdown.copy.fourTriggerSizesCoordinateTheRowAndTypographyDensity',
    Component: DropdownSizesExample,
    source: createExampleSource(dropdownSizesSource),
    styleSource: dropdownSizesStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
