import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

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
    description: 'Icons reinforce status without relying only on color.',
    Component: AlertIntentsExample,
    source: alertIntentsSource,
    styleSource: alertIntentsStyles,
  },
  alertContent: {
    id: 'alert-content',
    title: 'Title and description',
    description: 'A concise title can stand alone or include recovery guidance.',
    Component: AlertContentExample,
    source: alertContentSource,
    styleSource: alertContentStyles,
  },
  alertAction: {
    id: 'alert-action',
    title: 'Application action',
    description: 'The owner supplies a real control and handles its behavior.',
    Component: AlertActionExample,
    source: alertActionSource,
    styleSource: alertActionStyles,
  },
  alertClosable: {
    id: 'alert-closable',
    title: 'Closable alert',
    description: 'Close notifies the owner; the demo removes and restores the message.',
    Component: AlertClosableExample,
    source: alertClosableSource,
    styleSource: alertClosableStyles,
  },
  alertCustomIcon: {
    id: 'alert-custom-icon',
    title: 'Custom icon',
    description: 'Use a domain icon while intent continues to own color.',
    Component: AlertCustomIconExample,
    source: alertCustomIconSource,
    styleSource: alertCustomIconStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
