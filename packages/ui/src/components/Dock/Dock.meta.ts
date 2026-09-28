import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const dockMetadata = {
  name: 'Dock',
  package: '@virgo-design/ui',
  category: 'Layout',
  description:
    'Attaches movable interface regions to boundary edges with snapped or continuous positioning, independent movement locking and fixed pinning, and optional browser persistence.',
  import: "import { Dock } from '@virgo-design/ui';",
  placements: [
    { name: 'top', description: 'Horizontal dock along the top edge.' },
    { name: 'right', description: 'Vertical dock along the right edge.' },
    { name: 'bottom', description: 'Horizontal dock along the bottom edge.' },
    { name: 'left', description: 'Vertical dock along the left edge.' },
  ],
  states: ['default', 'hover', 'focus-visible', 'dragging', 'locked', 'pinned', 'disabled'],
  anatomy: [
    {
      name: 'Dock.Boundary',
      description: 'Local containing block that defines all four docking edges.',
    },
    {
      name: 'Dock.Root',
      description:
        'Controlled or uncontrolled dock placement with built-in lock and pin controls, normalized edge position, optional edge restrictions, and opt-in uncontrolled persistence.',
    },
    {
      name: 'Dock.Handle',
      description:
        'Dedicated pointer and keyboard drag affordance that can sit at the logical start or end; content itself remains interactive.',
    },
    {
      name: 'Dock.Content',
      description: 'Orientation-aware content slot for NavigationMenu or other interface regions.',
    },
  ],
  capabilities: {
    controlledPlacement: true,
    uncontrolledPlacement: true,
    topDocking: true,
    rightDocking: true,
    bottomDocking: true,
    leftDocking: true,
    edgeRestrictions: true,
    pointerDrag: true,
    keyboardRepositioning: true,
    gridSnapping: true,
    freePositioning: true,
    normalizedPosition: true,
    orientationState: true,
    interactionChrome: true,
    builtInControls: true,
    handlePositioning: true,
    localStoragePersistence: true,
    sessionStoragePersistence: true,
    consumerStorageKey: true,
    pinning: true,
    movementLocking: true,
    autoHide: false,
    persistence: true,
  },
  accessibility: [
    'Locking prevents pointer and keyboard repositioning; pinning uses fixed positioning and remains draggable while unlocked.',
    'Every Dock includes lock and pin action buttons with tooltips explaining the next action, revealed with its chrome on hover or focus and always available on touch devices.',
    'Dock.Handle is a native button with a default accessible name and does not make Dock.Content draggable.',
    'Interaction chrome also reveals on focus-within, so keyboard users receive the same movement affordance as pointer users.',
    'Arrow keys move through snap positions in grid mode or fine-tune by 1% in free mode; Home and End jump to edge endpoints.',
    'Alt+Arrow shortcuts switch only to enabled docking edges; disabled edges are omitted from the advertised keyboard shortcuts.',
    'Consumers should provide an accessible name that describes the movable region when the default Move dock label is insufficient.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
