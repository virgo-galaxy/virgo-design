import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import DockControlledExample from './DockControlledExample';
import dockControlledStyles from './DockControlledExample.module.scss?virgo-raw';
import dockControlledSource from './DockControlledExample.tsx?raw';
import DockFreePositioningExample from './DockFreePositioningExample';
import dockFreePositioningStyles from './DockFreePositioningExample.module.scss?virgo-raw';
import dockFreePositioningSource from './DockFreePositioningExample.tsx?raw';
import DockHandlePositionExample from './DockHandlePositionExample';
import dockHandlePositionStyles from './DockHandlePositionExample.module.scss?virgo-raw';
import dockHandlePositionSource from './DockHandlePositionExample.tsx?raw';
import DockLockPinExample from './DockLockPinExample';
import dockLockPinStyles from './DockLockPinExample.module.scss?virgo-raw';
import dockLockPinSource from './DockLockPinExample.tsx?raw';
import DockPersistenceExample from './DockPersistenceExample';
import dockPersistenceStyles from './DockPersistenceExample.module.scss?virgo-raw';
import dockPersistenceSource from './DockPersistenceExample.tsx?raw';

export const dockExamples = {
  dockLockPin: {
    id: 'dock-lock-pin',
    title: 'Lock and pin',
    description:
      'Every Dock includes lock and pin controls with tooltips. Lock prevents movement; pin keeps the dock fixed while the preview scrolls.',
    Component: DockLockPinExample,
    source: dockLockPinSource,
    styleSource: dockLockPinStyles,
  },
  dockControlled: {
    id: 'dock-controlled',
    title: 'Placement control',
    description:
      'Control top, right, bottom, and left placement from application state while preserving drag updates.',
    Component: DockControlledExample,
    source: dockControlledSource,
    styleSource: dockControlledStyles,
  },
  dockFreePositioning: {
    id: 'dock-free-positioning',
    title: 'Free positioning',
    description:
      'Disable grid quantization for continuous normalized pointer placement while retaining precise default positions and keyboard fine-tuning.',
    Component: DockFreePositioningExample,
    source: dockFreePositioningSource,
    styleSource: dockFreePositioningStyles,
  },
  dockPersistence: {
    id: 'dock-persistence',
    title: 'Persistent placement',
    description:
      'Persist uncontrolled placement with an explicit key in localStorage or sessionStorage while edge restrictions remain authoritative.',
    Component: DockPersistenceExample,
    source: dockPersistenceSource,
    styleSource: dockPersistenceStyles,
  },
  dockHandlePosition: {
    id: 'dock-handle-position',
    title: 'Handle position',
    description:
      'Place the dedicated movement handle at the logical start or end of the dock while orientation maps that choice across horizontal and vertical edges.',
    Component: DockHandlePositionExample,
    source: dockHandlePositionSource,
    styleSource: dockHandlePositionStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
