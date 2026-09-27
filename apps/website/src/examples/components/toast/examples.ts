import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import ToastIntentsExample from './ToastIntentsExample';
import toastIntentsStyles from './ToastIntentsExample.module.scss?virgo-raw';
import toastIntentsSource from './ToastIntentsExample.tsx?raw';
import ToastPlacementExample from './ToastPlacementExample';
import toastPlacementStyles from './ToastPlacementExample.module.scss?virgo-raw';
import toastPlacementSource from './ToastPlacementExample.tsx?raw';
import ToastStackExample from './ToastStackExample';
import toastStackStyles from './ToastStackExample.module.scss?virgo-raw';
import toastStackSource from './ToastStackExample.tsx?raw';
import ToastUndoExample from './ToastUndoExample';
import toastUndoStyles from './ToastUndoExample.module.scss?virgo-raw';
import toastUndoSource from './ToastUndoExample.tsx?raw';

export const toastExamples = {
  toastIntents: {
    id: 'toast-intents',
    title: 'Status variants',
    description: 'Semantic status and live announcements in a local preview viewport.',
    Component: ToastIntentsExample,
    source: toastIntentsSource,
    styleSource: toastIntentsStyles,
  },
  toastUndo: {
    id: 'toast-undo',
    title: 'Action and dismissal',
    description: 'The application owns the undo action and replay control.',
    Component: ToastUndoExample,
    source: toastUndoSource,
    styleSource: toastUndoStyles,
  },
  toastStack: {
    id: 'toast-stack',
    title: 'Stacking and timers',
    description: 'Hover or focus a toast to pause only its remaining duration.',
    Component: ToastStackExample,
    source: toastStackSource,
    styleSource: toastStackStyles,
  },
  toastPlacement: {
    id: 'toast-placement',
    title: 'Viewport placement',
    description: 'A positioned preview canvas contains all six viewport placements.',
    Component: ToastPlacementExample,
    source: toastPlacementSource,
    styleSource: toastPlacementStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
