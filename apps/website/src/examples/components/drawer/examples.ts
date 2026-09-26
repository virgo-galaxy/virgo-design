import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import DrawerAnatomyExample from './DrawerAnatomyExample';
import drawerAnatomySource from './DrawerAnatomyExample.tsx?raw';
import DrawerFormExample from './DrawerFormExample';
import drawerFormSource from './DrawerFormExample.tsx?raw';
import DrawerNonModalExample from './DrawerNonModalExample';
import drawerNonModalSource from './DrawerNonModalExample.tsx?raw';
import DrawerPlacementsExample from './DrawerPlacementsExample';
import drawerPlacementsSource from './DrawerPlacementsExample.tsx?raw';
import DrawerSizesExample from './DrawerSizesExample';
import drawerSizesSource from './DrawerSizesExample.tsx?raw';

export const drawerExamples = {
  drawerPlacements: {
    id: 'drawer-placements',
    title: 'Screen edges',
    description: 'Each drawer is independently triggered from one physical edge.',
    Component: DrawerPlacementsExample,
    source: drawerPlacementsSource,
  },
  drawerSizes: {
    id: 'drawer-sizes',
    title: 'Panel sizes',
    description: 'Side drawers use width; top and bottom drawers use height.',
    Component: DrawerSizesExample,
    source: drawerSizesSource,
  },
  drawerAnatomy: {
    id: 'drawer-anatomy',
    title: 'Scrollable body',
    description: 'Header and footer stay stable around an independently scrolling body.',
    Component: DrawerAnatomyExample,
    source: drawerAnatomySource,
  },
  drawerForm: {
    id: 'drawer-form',
    title: 'Controlled form',
    description: 'Save handles the form and then closes this drawer only.',
    Component: DrawerFormExample,
    source: drawerFormSource,
  },
  drawerNonModal: {
    id: 'drawer-non-modal',
    title: 'Non-modal inspector',
    description: 'Keep the surrounding workspace directly interactive.',
    Component: DrawerNonModalExample,
    source: drawerNonModalSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
