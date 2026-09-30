export const navigationMenuEnUS = {
  overview: {
    description:
      'Navigation semantics for horizontal links, vertical destinations, and nested disclosure without owning routes or application shell layout.',
  },
  facts: {
    orientations: 'Orientations',
    variant: 'Variant',
    themes: 'Themes',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    hoverAndFocus: 'Hover and focus',
    sharedLayerSystem: 'Shared layer system',
    keyboardNavigation: 'Keyboard navigation',
  },
  navigationOrientations: {
    title: 'Navigation orientations',
    description: 'The same item model supports a compact top row or a vertical destination list.',
  },
  navigationSegmented: {
    title: 'Segmented navigation',
    description:
      'A compact surface groups peer destinations while keeping navigation semantics and link behavior.',
  },
  navigationPopover: {
    title: 'Hover submenu',
    description:
      'Hover a navigation item to open its destinations beside it. Move into a submenu to explore another level.',
  },
  navigationNested: {
    title: 'Nested navigation',
    description:
      'A disclosure trigger reveals related destinations in document flow and keeps navigation semantics intact.',
  },
  navigationGrouped: {
    title: 'Grouped navigation',
    description:
      'Organize related destinations with Group and GroupLabel. Each group keeps its own keyboard navigation scope.',
  },
} as const;
