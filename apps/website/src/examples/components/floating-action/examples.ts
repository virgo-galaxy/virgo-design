import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import FloatingActionDisabledExample from './FloatingActionDisabledExample';
import floatingActionDisabledSource from './FloatingActionDisabledExample.tsx?raw';
import FloatingActionGroupExample from './FloatingActionGroupExample';
import floatingActionGroupSource from './FloatingActionGroupExample.tsx?raw';
import FloatingActionPlacementExample from './FloatingActionPlacementExample';
import floatingActionPlacementSource from './FloatingActionPlacementExample.tsx?raw';
import FloatingActionVariantsExample from './FloatingActionVariantsExample';
import floatingActionVariantsSource from './FloatingActionVariantsExample.tsx?raw';

import floatingActionDisabledStyles from './FloatingActionDisabledExample.module.scss?virgo-raw';
import floatingActionGroupStyles from './FloatingActionGroupExample.module.scss?virgo-raw';
import floatingActionPlacementStyles from './FloatingActionPlacementExample.module.scss?virgo-raw';
import floatingActionVariantsStyles from './FloatingActionVariantsExample.module.scss?virgo-raw';

export const floatingActionExamples = {
  floatingActionVariants: {
    id: 'floating-action-variants',
    title: 'Action variants',
    titleTranslationKey: 'examples.floatingAction.copy.actionVariants',
    description: 'Four emphasis levels use the same circular action anatomy.',
    descriptionTranslationKey:
      'examples.floatingAction.copy.fourEmphasisLevelsUseTheSameCircularActionAnatomy',
    Component: FloatingActionVariantsExample,
    source: createExampleSource(floatingActionVariantsSource),
    styleSource: floatingActionVariantsStyles,
  },
  floatingActionDisabled: {
    id: 'floating-action-disabled',
    title: 'Disabled action',
    titleTranslationKey: 'examples.floatingAction.copy.disabledAction',
    description: 'The disabled state stays visible but cannot execute an action.',
    descriptionTranslationKey:
      'examples.floatingAction.copy.theDisabledStateStaysVisibleButCannotExecuteAnAction',
    Component: FloatingActionDisabledExample,
    source: createExampleSource(floatingActionDisabledSource),
    styleSource: floatingActionDisabledStyles,
  },
  floatingActionGroup: {
    id: 'floating-action-group',
    title: 'Controlled action group',
    titleTranslationKey: 'examples.floatingAction.copy.controlledActionGroup',
    description: 'Choosing an action updates local feedback and closes this group only.',
    descriptionTranslationKey:
      'examples.floatingAction.copy.choosingAnActionUpdatesLocalFeedbackAndClosesThisGroup',
    Component: FloatingActionGroupExample,
    source: createExampleSource(floatingActionGroupSource),
    styleSource: floatingActionGroupStyles,
  },
  floatingActionPlacement: {
    id: 'floating-action-placement',
    title: 'Expansion directions',
    titleTranslationKey: 'examples.floatingAction.copy.expansionDirections',
    description: 'Placement chooses where this action group expands relative to its trigger.',
    descriptionTranslationKey:
      'examples.floatingAction.copy.placementChoosesWhereThisActionGroupExpandsRelativeToIts',
    Component: FloatingActionPlacementExample,
    source: createExampleSource(floatingActionPlacementSource),
    styleSource: floatingActionPlacementStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
