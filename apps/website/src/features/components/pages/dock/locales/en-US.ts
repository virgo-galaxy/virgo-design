export const dockEnUS = {
  overview: {
    description:
      'Attaches movable interface regions to boundary edges with snapped or continuous positioning, independent movement locking and fixed pinning, and optional browser persistence.',
  },
  facts: {
    edges: 'Edges',
    positioning: 'Positioning',
    orientations: 'Orientations',
    storage: 'Storage',
  },
  specimen: {
    summary: 'top · 12 snap divisions',
    referenceSpecimen: 'Reference specimen',
    interactionChrome: 'Interaction chrome',
    snapFreePlacement: 'Snap + free placement',
    keyboardRepositioning: 'Keyboard repositioning',
    startEndHandle: 'Start / end handle',
  },
  controlledPlacement: {
    title: 'Placement control',
    description:
      'Control top, right, bottom, and left placement from product state while pointer and keyboard interaction continue to report normalized positions.',
  },
  freePositioning: {
    title: 'Free positioning',
    description:
      'Set snapDivisions to false for continuous normalized pointer movement, exact default positions, and 1% keyboard fine-tuning.',
  },
  persistentPlacement: {
    title: 'Persistent placement',
    description:
      'Uncontrolled Dock instances can restore normalized placement from local or session storage with an explicit consumer-owned key.',
  },
  handlePosition: {
    title: 'Handle position',
    description:
      'Dock.Handle defaults to the logical start and can move to the logical end without coupling the API to horizontal or vertical physical directions.',
  },
  lockPin: {
    title: 'Lock and pin',
    description:
      'Every Dock includes lock and pin controls with tooltips, revealed on hover or focus. Lock prevents movement; pin keeps the dock fixed while content scrolls.',
  },
} as const;
