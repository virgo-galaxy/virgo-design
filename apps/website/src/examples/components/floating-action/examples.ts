import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import FloatingActionDisabledExample from './FloatingActionDisabledExample';
import floatingActionDisabledStyles from './FloatingActionDisabledExample.module.scss?virgo-raw';
import floatingActionDisabledSource from './FloatingActionDisabledExample.tsx?raw';
import FloatingActionGroupExample from './FloatingActionGroupExample';
import floatingActionGroupStyles from './FloatingActionGroupExample.module.scss?virgo-raw';
import floatingActionGroupSource from './FloatingActionGroupExample.tsx?raw';
import FloatingActionPlacementExample from './FloatingActionPlacementExample';
import floatingActionPlacementStyles from './FloatingActionPlacementExample.module.scss?virgo-raw';
import floatingActionPlacementSource from './FloatingActionPlacementExample.tsx?raw';
import FloatingActionVariantsExample from './FloatingActionVariantsExample';
import floatingActionVariantsStyles from './FloatingActionVariantsExample.module.scss?virgo-raw';
import floatingActionVariantsSource from './FloatingActionVariantsExample.tsx?raw';

export const floatingActionExamples = {
  floatingActionVariants: {
    id: 'floating-action-variants',
    title: 'Action variants',
    description: 'Four emphasis levels use the same circular action anatomy.',
    Component: FloatingActionVariantsExample,
    source: floatingActionVariantsSource,
    styleSource: floatingActionVariantsStyles,
  },
  floatingActionDisabled: {
    id: 'floating-action-disabled',
    title: 'Disabled action',
    description: 'The disabled state stays visible but cannot execute an action.',
    Component: FloatingActionDisabledExample,
    source: floatingActionDisabledSource,
    styleSource: floatingActionDisabledStyles,
  },
  floatingActionGroup: {
    id: 'floating-action-group',
    title: 'Controlled action group',
    description: 'Choosing an action updates local feedback and closes this group only.',
    Component: FloatingActionGroupExample,
    source: floatingActionGroupSource,
    styleSource: floatingActionGroupStyles,
  },
  floatingActionPlacement: {
    id: 'floating-action-placement',
    title: 'Expansion directions',
    description: 'Placement chooses where this action group expands relative to its trigger.',
    Component: FloatingActionPlacementExample,
    source: floatingActionPlacementSource,
    styleSource: floatingActionPlacementStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
