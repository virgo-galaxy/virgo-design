import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import ToastIntentsExample from './ToastIntentsExample';
import toastIntentsSource from './ToastIntentsExample.tsx?raw';
import ToastPlacementExample from './ToastPlacementExample';
import toastPlacementSource from './ToastPlacementExample.tsx?raw';
import ToastStackExample from './ToastStackExample';
import toastStackSource from './ToastStackExample.tsx?raw';
import ToastUndoExample from './ToastUndoExample';
import toastUndoSource from './ToastUndoExample.tsx?raw';

import toastIntentsStyles from './ToastIntentsExample.module.scss?virgo-raw';
import toastPlacementStyles from './ToastPlacementExample.module.scss?virgo-raw';
import toastStackStyles from './ToastStackExample.module.scss?virgo-raw';
import toastUndoStyles from './ToastUndoExample.module.scss?virgo-raw';

export const toastExamples = {
  toastIntents: {
    id: 'toast-intents',
    title: 'Status variants',
    titleTranslationKey: 'examples.toast.copy.statusVariants',
    description: 'Semantic status and live announcements in a local preview viewport.',
    descriptionTranslationKey:
      'examples.toast.copy.semanticStatusAndLiveAnnouncementsInALocalPreviewViewport',
    Component: ToastIntentsExample,
    source: createExampleSource(toastIntentsSource),
    styleSource: toastIntentsStyles,
  },
  toastUndo: {
    id: 'toast-undo',
    title: 'Action and dismissal',
    titleTranslationKey: 'examples.toast.copy.actionAndDismissal',
    description: 'The application owns the undo action and replay control.',
    descriptionTranslationKey:
      'examples.toast.copy.theApplicationOwnsTheUndoActionAndReplayControl',
    Component: ToastUndoExample,
    source: createExampleSource(toastUndoSource),
    styleSource: toastUndoStyles,
  },
  toastStack: {
    id: 'toast-stack',
    title: 'Stacking and timers',
    titleTranslationKey: 'examples.toast.copy.stackingAndTimers',
    description: 'Hover or focus a toast to pause only its remaining duration.',
    descriptionTranslationKey: 'examples.toast.copy.hoverOrFocusAToastToPauseOnlyItsRemaining',
    Component: ToastStackExample,
    source: createExampleSource(toastStackSource),
    styleSource: toastStackStyles,
  },
  toastPlacement: {
    id: 'toast-placement',
    title: 'Viewport placement',
    titleTranslationKey: 'examples.toast.copy.viewportPlacement',
    description: 'A positioned preview canvas contains all six viewport placements.',
    descriptionTranslationKey:
      'examples.toast.copy.aPositionedPreviewCanvasContainsAllSixViewportPlacements',
    Component: ToastPlacementExample,
    source: createExampleSource(toastPlacementSource),
    styleSource: toastPlacementStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
