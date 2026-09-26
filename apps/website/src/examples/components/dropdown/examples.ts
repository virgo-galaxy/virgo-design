import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

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

export const dropdownExamples = {
  dropdownClick: {
    id: 'dropdown-click',
    title: 'Click menu',
    description: 'Disabled and destructive items retain their native menu behavior.',
    Component: DropdownClickExample,
    source: dropdownClickSource,
  },
  dropdownHover: {
    id: 'dropdown-hover',
    title: 'Hover menu',
    description: 'Disabled and destructive items retain their native menu behavior.',
    Component: DropdownHoverExample,
    source: dropdownHoverSource,
  },
  dropdownDisabled: {
    id: 'dropdown-disabled',
    title: 'Disabled trigger',
    description: 'An unavailable root prevents the menu from opening.',
    Component: DropdownDisabledExample,
    source: dropdownDisabledSource,
  },
  dropdownPlacement: {
    id: 'dropdown-placement',
    title: 'Placement and arrow',
    description: 'Twelve positions with an arrow that can be disabled independently.',
    Component: DropdownPlacementExample,
    source: dropdownPlacementSource,
  },
  dropdownSplit: {
    id: 'dropdown-split',
    title: 'Split button',
    description: 'The main button acts; its neighbor opens related actions.',
    Component: DropdownSplitExample,
    source: dropdownSplitSource,
  },
  dropdownSplitStates: {
    id: 'dropdown-split-states',
    title: 'Split button states',
    description: 'Disabled and danger styles apply to the split action.',
    Component: DropdownSplitStatesExample,
    source: dropdownSplitStatesSource,
  },
  dropdownCustomTrigger: {
    id: 'dropdown-custom-trigger',
    title: 'Tooltip on a custom trigger',
    description: 'Compose descriptive help without nesting buttons.',
    Component: DropdownCustomTriggerExample,
    source: dropdownCustomTriggerSource,
  },
  dropdownControlled: {
    id: 'dropdown-controlled',
    title: 'Controlled menu',
    description: 'Keyboard navigation and open state belong to this example.',
    Component: DropdownControlledExample,
    source: dropdownControlledSource,
  },
  dropdownSizes: {
    id: 'dropdown-sizes',
    title: 'Menu density',
    description: 'Four trigger sizes coordinate the row and typography density.',
    Component: DropdownSizesExample,
    source: dropdownSizesSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
