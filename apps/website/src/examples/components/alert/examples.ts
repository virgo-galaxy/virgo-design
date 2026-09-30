import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import AlertActionExample from './AlertActionExample';
import alertActionStyles from './AlertActionExample.module.scss?virgo-raw';
import alertActionSource from './AlertActionExample.tsx?raw';
import AlertClosableExample from './AlertClosableExample';
import alertClosableStyles from './AlertClosableExample.module.scss?virgo-raw';
import alertClosableSource from './AlertClosableExample.tsx?raw';
import AlertContentExample from './AlertContentExample';
import alertContentStyles from './AlertContentExample.module.scss?virgo-raw';
import alertContentSource from './AlertContentExample.tsx?raw';
import AlertCustomIconExample from './AlertCustomIconExample';
import alertCustomIconStyles from './AlertCustomIconExample.module.scss?virgo-raw';
import alertCustomIconSource from './AlertCustomIconExample.tsx?raw';
import AlertIntentsExample from './AlertIntentsExample';
import alertIntentsStyles from './AlertIntentsExample.module.scss?virgo-raw';
import alertIntentsSource from './AlertIntentsExample.tsx?raw';

export const alertExamples = {
  alertIntents: {
    id: 'alert-intents',
    title: 'Semantic intents',
    titleTranslationKey: 'examples.alert.copy.semanticIntents',
    description: 'Icons reinforce status without relying only on color.',
    descriptionTranslationKey: 'examples.alert.copy.iconsReinforceStatusWithoutRelyingOnlyOnColor',
    Component: AlertIntentsExample,
    source: createExampleSource(alertIntentsSource),
    styleSource: alertIntentsStyles,
  },
  alertContent: {
    id: 'alert-content',
    title: 'Title and description',
    titleTranslationKey: 'examples.alert.copy.titleAndDescription',
    description: 'A concise title can stand alone or include recovery guidance.',
    descriptionTranslationKey:
      'examples.alert.copy.aConciseTitleCanStandAloneOrIncludeRecoveryGuidance',
    Component: AlertContentExample,
    source: createExampleSource(alertContentSource),
    styleSource: alertContentStyles,
  },
  alertAction: {
    id: 'alert-action',
    title: 'Application action',
    titleTranslationKey: 'examples.alert.copy.applicationAction',
    description: 'The owner supplies a real control and handles its behavior.',
    descriptionTranslationKey:
      'examples.alert.copy.theOwnerSuppliesARealControlAndHandlesItsBehavior',
    Component: AlertActionExample,
    source: createExampleSource(alertActionSource),
    styleSource: alertActionStyles,
  },
  alertClosable: {
    id: 'alert-closable',
    title: 'Closable alert',
    titleTranslationKey: 'examples.alert.copy.closableAlert',
    description: 'Close notifies the owner; the demo removes and restores the message.',
    descriptionTranslationKey:
      'examples.alert.copy.closeNotifiesTheOwnerTheDemoRemovesAndRestoresThe',
    Component: AlertClosableExample,
    source: createExampleSource(alertClosableSource),
    styleSource: alertClosableStyles,
  },
  alertCustomIcon: {
    id: 'alert-custom-icon',
    title: 'Custom icon',
    titleTranslationKey: 'examples.alert.copy.customIcon',
    description: 'Use a custom icon with semantic colors.',
    descriptionTranslationKey: 'examples.alert.copy.useADomainIconWhileIntentContinuesToOwnColor',
    Component: AlertCustomIconExample,
    source: createExampleSource(alertCustomIconSource),
    styleSource: alertCustomIconStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
