import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import ToastIntentsExample from './ToastIntentsExample';
import toastIntentsSource from './ToastIntentsExample.tsx?raw';
import ToastPlacementExample from './ToastPlacementExample';
import toastPlacementSource from './ToastPlacementExample.tsx?raw';
import ToastStackExample from './ToastStackExample';
import toastStackSource from './ToastStackExample.tsx?raw';
import ToastUndoExample from './ToastUndoExample';
import toastUndoSource from './ToastUndoExample.tsx?raw';

export const toastExamples = {
  toastIntents: {
    id: 'toast-intents',
    title: 'Status variants',
    description: 'Semantic status and live announcements in a local preview viewport.',
    Component: ToastIntentsExample,
    source: toastIntentsSource,
  },
  toastUndo: {
    id: 'toast-undo',
    title: 'Action and dismissal',
    description: 'The application owns the undo action and replay control.',
    Component: ToastUndoExample,
    source: toastUndoSource,
  },
  toastStack: {
    id: 'toast-stack',
    title: 'Stacking and timers',
    description: 'Hover or focus a toast to pause only its remaining duration.',
    Component: ToastStackExample,
    source: toastStackSource,
  },
  toastPlacement: {
    id: 'toast-placement',
    title: 'Viewport placement',
    description: 'A positioned preview canvas contains all six viewport placements.',
    Component: ToastPlacementExample,
    source: toastPlacementSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
