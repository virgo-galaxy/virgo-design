import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import DockControlledExample from './DockControlledExample';
import dockControlledSource from './DockControlledExample.tsx?raw';
import DockFreePositioningExample from './DockFreePositioningExample';
import dockFreePositioningSource from './DockFreePositioningExample.tsx?raw';
import DockHandlePositionExample from './DockHandlePositionExample';
import dockHandlePositionSource from './DockHandlePositionExample.tsx?raw';
import DockLockPinExample from './DockLockPinExample';
import dockLockPinSource from './DockLockPinExample.tsx?raw';
import DockPersistenceExample from './DockPersistenceExample';
import dockPersistenceSource from './DockPersistenceExample.tsx?raw';

import dockControlledStyles from './DockControlledExample.module.scss?virgo-raw';
import dockFreePositioningStyles from './DockFreePositioningExample.module.scss?virgo-raw';
import dockHandlePositionStyles from './DockHandlePositionExample.module.scss?virgo-raw';
import dockLockPinStyles from './DockLockPinExample.module.scss?virgo-raw';
import dockPersistenceStyles from './DockPersistenceExample.module.scss?virgo-raw';

export const dockExamples = {
  dockLockPin: {
    id: 'dock-lock-pin',
    title: 'Lock and pin',
    titleTranslationKey: 'examples.dock.copy.lockAndPin',
    description:
      'Every Dock includes lock and pin controls with tooltips. Lock prevents movement; pin keeps the dock fixed while the preview scrolls.',
    descriptionTranslationKey:
      'examples.dock.copy.everyDockIncludesLockAndPinControlsWithTooltipsLock',
    Component: DockLockPinExample,
    source: createExampleSource(dockLockPinSource),
    styleSource: dockLockPinStyles,
  },
  dockControlled: {
    id: 'dock-controlled',
    title: 'Placement control',
    titleTranslationKey: 'examples.dock.copy.placementControl',
    description:
      'Control top, right, bottom, and left placement from application state while preserving drag updates.',
    descriptionTranslationKey:
      'examples.dock.copy.controlTopRightBottomAndLeftPlacementFromApplicationState',
    Component: DockControlledExample,
    source: createExampleSource(dockControlledSource),
    styleSource: dockControlledStyles,
  },
  dockFreePositioning: {
    id: 'dock-free-positioning',
    title: 'Free positioning',
    titleTranslationKey: 'examples.dock.copy.freePositioning',
    description:
      'Disable grid quantization for continuous normalized pointer placement while retaining precise default positions and keyboard fine-tuning.',
    descriptionTranslationKey:
      'examples.dock.copy.disableGridQuantizationForContinuousNormalizedPointerPlacementWhileRetaining',
    Component: DockFreePositioningExample,
    source: createExampleSource(dockFreePositioningSource),
    styleSource: dockFreePositioningStyles,
  },
  dockPersistence: {
    id: 'dock-persistence',
    title: 'Persistent placement',
    titleTranslationKey: 'examples.dock.copy.persistentPlacement',
    description:
      'Persist uncontrolled placement with an explicit key in localStorage or sessionStorage while edge restrictions remain authoritative.',
    descriptionTranslationKey:
      'examples.dock.copy.persistUncontrolledPlacementWithAnExplicitKeyInLocalstorageOr',
    Component: DockPersistenceExample,
    source: createExampleSource(dockPersistenceSource),
    styleSource: dockPersistenceStyles,
  },
  dockHandlePosition: {
    id: 'dock-handle-position',
    title: 'Handle position',
    titleTranslationKey: 'examples.dock.copy.handlePosition',
    description:
      'Place the dedicated movement handle at the logical start or end of the dock while orientation maps that choice across horizontal and vertical edges.',
    descriptionTranslationKey:
      'examples.dock.copy.placeTheDedicatedMovementHandleAtTheLogicalStartOr',
    Component: DockHandlePositionExample,
    source: createExampleSource(dockHandlePositionSource),
    styleSource: dockHandlePositionStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
