import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import AlertActionExample from './AlertActionExample';
import alertActionSource from './AlertActionExample.tsx?raw';
import AlertClosableExample from './AlertClosableExample';
import alertClosableSource from './AlertClosableExample.tsx?raw';
import AlertContentExample from './AlertContentExample';
import alertContentSource from './AlertContentExample.tsx?raw';
import AlertCustomIconExample from './AlertCustomIconExample';
import alertCustomIconSource from './AlertCustomIconExample.tsx?raw';
import AlertIntentsExample from './AlertIntentsExample';
import alertIntentsSource from './AlertIntentsExample.tsx?raw';

export const alertExamples = {
  alertIntents: {
    id: 'alert-intents',
    title: 'Semantic intents',
    description: 'Icons reinforce status without relying only on color.',
    Component: AlertIntentsExample,
    source: alertIntentsSource,
  },
  alertContent: {
    id: 'alert-content',
    title: 'Title and description',
    description: 'A concise title can stand alone or include recovery guidance.',
    Component: AlertContentExample,
    source: alertContentSource,
  },
  alertAction: {
    id: 'alert-action',
    title: 'Application action',
    description: 'The owner supplies a real control and handles its behavior.',
    Component: AlertActionExample,
    source: alertActionSource,
  },
  alertClosable: {
    id: 'alert-closable',
    title: 'Closable alert',
    description: 'Close notifies the owner; the demo removes and restores the message.',
    Component: AlertClosableExample,
    source: alertClosableSource,
  },
  alertCustomIcon: {
    id: 'alert-custom-icon',
    title: 'Custom icon',
    description: 'Use a domain icon while intent continues to own color.',
    Component: AlertCustomIconExample,
    source: alertCustomIconSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
