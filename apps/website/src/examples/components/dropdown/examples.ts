import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import DropdownClickExample from './DropdownClickExample';
import dropdownClickStyles from './DropdownClickExample.module.scss?virgo-raw';
import dropdownClickSource from './DropdownClickExample.tsx?raw';
import DropdownControlledExample from './DropdownControlledExample';
import dropdownControlledStyles from './DropdownControlledExample.module.scss?virgo-raw';
import dropdownControlledSource from './DropdownControlledExample.tsx?raw';
import DropdownCustomTriggerExample from './DropdownCustomTriggerExample';
import dropdownCustomTriggerStyles from './DropdownCustomTriggerExample.module.scss?virgo-raw';
import dropdownCustomTriggerSource from './DropdownCustomTriggerExample.tsx?raw';
import DropdownDisabledExample from './DropdownDisabledExample';
import dropdownDisabledStyles from './DropdownDisabledExample.module.scss?virgo-raw';
import dropdownDisabledSource from './DropdownDisabledExample.tsx?raw';
import DropdownHoverExample from './DropdownHoverExample';
import dropdownHoverStyles from './DropdownHoverExample.module.scss?virgo-raw';
import dropdownHoverSource from './DropdownHoverExample.tsx?raw';
import DropdownPlacementExample from './DropdownPlacementExample';
import dropdownPlacementStyles from './DropdownPlacementExample.module.scss?virgo-raw';
import dropdownPlacementSource from './DropdownPlacementExample.tsx?raw';
import DropdownSizesExample from './DropdownSizesExample';
import dropdownSizesStyles from './DropdownSizesExample.module.scss?virgo-raw';
import dropdownSizesSource from './DropdownSizesExample.tsx?raw';
import DropdownSplitExample from './DropdownSplitExample';
import dropdownSplitStyles from './DropdownSplitExample.module.scss?virgo-raw';
import dropdownSplitSource from './DropdownSplitExample.tsx?raw';
import DropdownSplitStatesExample from './DropdownSplitStatesExample';
import dropdownSplitStatesStyles from './DropdownSplitStatesExample.module.scss?virgo-raw';
import dropdownSplitStatesSource from './DropdownSplitStatesExample.tsx?raw';

export const dropdownExamples = {
  dropdownClick: {
    id: 'dropdown-click',
    title: 'Click menu',
    description: 'Disabled and destructive items retain their native menu behavior.',
    Component: DropdownClickExample,
    source: dropdownClickSource,
    styleSource: dropdownClickStyles,
  },
  dropdownHover: {
    id: 'dropdown-hover',
    title: 'Hover menu',
    description: 'Disabled and destructive items retain their native menu behavior.',
    Component: DropdownHoverExample,
    source: dropdownHoverSource,
    styleSource: dropdownHoverStyles,
  },
  dropdownDisabled: {
    id: 'dropdown-disabled',
    title: 'Disabled trigger',
    description: 'An unavailable root prevents the menu from opening.',
    Component: DropdownDisabledExample,
    source: dropdownDisabledSource,
    styleSource: dropdownDisabledStyles,
  },
  dropdownPlacement: {
    id: 'dropdown-placement',
    title: 'Placement and arrow',
    description: 'Twelve positions with an arrow that can be disabled independently.',
    Component: DropdownPlacementExample,
    source: dropdownPlacementSource,
    styleSource: dropdownPlacementStyles,
  },
  dropdownSplit: {
    id: 'dropdown-split',
    title: 'Split button',
    description: 'The main button acts; its neighbor opens related actions.',
    Component: DropdownSplitExample,
    source: dropdownSplitSource,
    styleSource: dropdownSplitStyles,
  },
  dropdownSplitStates: {
    id: 'dropdown-split-states',
    title: 'Split button states',
    description: 'Disabled and danger styles apply to the split action.',
    Component: DropdownSplitStatesExample,
    source: dropdownSplitStatesSource,
    styleSource: dropdownSplitStatesStyles,
  },
  dropdownCustomTrigger: {
    id: 'dropdown-custom-trigger',
    title: 'Tooltip on a custom trigger',
    description: 'Compose descriptive help without nesting buttons.',
    Component: DropdownCustomTriggerExample,
    source: dropdownCustomTriggerSource,
    styleSource: dropdownCustomTriggerStyles,
  },
  dropdownControlled: {
    id: 'dropdown-controlled',
    title: 'Controlled menu',
    description: 'Keyboard navigation and open state belong to this example.',
    Component: DropdownControlledExample,
    source: dropdownControlledSource,
    styleSource: dropdownControlledStyles,
  },
  dropdownSizes: {
    id: 'dropdown-sizes',
    title: 'Menu density',
    description: 'Four trigger sizes coordinate the row and typography density.',
    Component: DropdownSizesExample,
    source: dropdownSizesSource,
    styleSource: dropdownSizesStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
