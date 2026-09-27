import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import DrawerAnatomyExample from './DrawerAnatomyExample';
import drawerAnatomyStyles from './DrawerAnatomyExample.module.scss?virgo-raw';
import drawerAnatomySource from './DrawerAnatomyExample.tsx?raw';
import DrawerFormExample from './DrawerFormExample';
import drawerFormStyles from './DrawerFormExample.module.scss?virgo-raw';
import drawerFormSource from './DrawerFormExample.tsx?raw';
import DrawerNonModalExample from './DrawerNonModalExample';
import drawerNonModalStyles from './DrawerNonModalExample.module.scss?virgo-raw';
import drawerNonModalSource from './DrawerNonModalExample.tsx?raw';
import DrawerPlacementsExample from './DrawerPlacementsExample';
import drawerPlacementsStyles from './DrawerPlacementsExample.module.scss?virgo-raw';
import drawerPlacementsSource from './DrawerPlacementsExample.tsx?raw';
import DrawerSizesExample from './DrawerSizesExample';
import drawerSizesStyles from './DrawerSizesExample.module.scss?virgo-raw';
import drawerSizesSource from './DrawerSizesExample.tsx?raw';

export const drawerExamples = {
  drawerPlacements: {
    id: 'drawer-placements',
    title: 'Screen edges',
    description: 'Each drawer is independently triggered from one physical edge.',
    Component: DrawerPlacementsExample,
    source: drawerPlacementsSource,
    styleSource: drawerPlacementsStyles,
  },
  drawerSizes: {
    id: 'drawer-sizes',
    title: 'Panel sizes',
    description: 'Side drawers use width; top and bottom drawers use height.',
    Component: DrawerSizesExample,
    source: drawerSizesSource,
    styleSource: drawerSizesStyles,
  },
  drawerAnatomy: {
    id: 'drawer-anatomy',
    title: 'Scrollable body',
    description: 'Header and footer stay stable around an independently scrolling body.',
    Component: DrawerAnatomyExample,
    source: drawerAnatomySource,
    styleSource: drawerAnatomyStyles,
  },
  drawerForm: {
    id: 'drawer-form',
    title: 'Controlled form',
    description: 'Save handles the form and then closes this drawer only.',
    Component: DrawerFormExample,
    source: drawerFormSource,
    styleSource: drawerFormStyles,
  },
  drawerNonModal: {
    id: 'drawer-non-modal',
    title: 'Non-modal inspector',
    description: 'Keep the surrounding workspace directly interactive.',
    Component: DrawerNonModalExample,
    source: drawerNonModalSource,
    styleSource: drawerNonModalStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
