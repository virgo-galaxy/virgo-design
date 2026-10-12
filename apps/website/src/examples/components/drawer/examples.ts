import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

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
    titleTranslationKey: 'examples.drawer.copy.screenEdges',
    description: 'Each drawer is independently triggered from one physical edge.',
    descriptionTranslationKey:
      'examples.drawer.copy.eachDrawerIsIndependentlyTriggeredFromOnePhysicalEdge',
    Component: DrawerPlacementsExample,
    source: createExampleSource(drawerPlacementsSource),
    styleSource: drawerPlacementsStyles,
  },
  drawerSizes: {
    id: 'drawer-sizes',
    title: 'Panel sizes',
    titleTranslationKey: 'examples.drawer.copy.panelSizes',
    description: 'Side drawers use width; top and bottom drawers use height.',
    descriptionTranslationKey:
      'examples.drawer.copy.sideDrawersUseWidthTopAndBottomDrawersUseHeight',
    Component: DrawerSizesExample,
    source: createExampleSource(drawerSizesSource),
    styleSource: drawerSizesStyles,
  },
  drawerAnatomy: {
    id: 'drawer-anatomy',
    title: 'Scrollable body',
    titleTranslationKey: 'examples.drawer.copy.scrollableBody',
    description: 'Header and footer stay stable around an independently scrolling body.',
    descriptionTranslationKey:
      'examples.drawer.copy.headerAndFooterStayStableAroundAnIndependentlyScrollingBody',
    Component: DrawerAnatomyExample,
    source: createExampleSource(drawerAnatomySource),
    styleSource: drawerAnatomyStyles,
  },
  drawerForm: {
    id: 'drawer-form',
    title: 'Controlled form',
    titleTranslationKey: 'examples.drawer.copy.controlledForm',
    description: 'Save handles the form and then closes this drawer only.',
    descriptionTranslationKey: 'examples.drawer.copy.saveHandlesTheFormAndThenClosesThisDrawerOnly',
    Component: DrawerFormExample,
    source: createExampleSource(drawerFormSource),
    styleSource: drawerFormStyles,
  },
  drawerNonModal: {
    id: 'drawer-non-modal',
    title: 'Non-modal inspector',
    titleTranslationKey: 'examples.drawer.copy.nonModalInspector',
    description: 'Keep the surrounding example directly interactive.',
    descriptionTranslationKey:
      'examples.drawer.copy.keepTheSurroundingWorkspaceDirectlyInteractive',
    Component: DrawerNonModalExample,
    source: createExampleSource(drawerNonModalSource),
    styleSource: drawerNonModalStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
