export const layoutEnUS = {
  overview: {
    description:
      'Provides the page-level skeleton for semantic regions plus independent spatial lanes through vertical, horizontal, and nested composition.',
  },
  facts: {
    directions: 'Directions',
    structures: 'Structures',
    composition: 'Composition',
    nested: 'Nested',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    verticalComposition: 'Vertical composition',
    laneOwnedBodyRegion: 'Lane-owned body region',
    semanticPageSkeleton: 'Semantic page skeleton',
  },
  structures: {
    title: 'Layout structures',
    description: 'Five compositions of Header, Lane, Sidebar, Content, Footer, and a compact Rail.',
  },
  behaviors: {
    title: 'Layout behaviors',
    description:
      'Surface, resizing, sticky or fixed positioning, and Lane boundaries stay structural and composable.',
    note: 'Compose the structures above with navigation, surfaces, and interactive controls.',
  },
  header: {
    title: 'Header composition',
    description:
      'Logo and a horizontal NavigationMenu share a Header. Surface provides the background.',
  },
  sidebar: {
    title: 'Collapsible sidebar',
    description: 'Use the bottom control to switch between full navigation and an icon rail.',
  },
  controlled: {
    title: 'Header trigger',
    description:
      'A controlled Sidebar lets its toggle live in the Header and own the collapsed state.',
  },
  overlay: {
    title: 'Overlay sidebar',
    description:
      'A zero-width collapsed Sidebar opens over the content. The external Header control stays available.',
  },
  floatingSidebar: {
    title: 'Floating sidebar',
    description:
      'A detached sidebar sits inside full-width Content. Collapse it into a capsule, or open Items to explore its submenu.',
  },
  floatingActions: {
    title: 'Floating actions',
    description:
      "A standalone action and an expandable action group sit in Content's lower-right corner. Try the buttons, Escape, and outside clicks.",
  },
  groupedSidebar: {
    title: 'Grouped sidebar navigation',
    description:
      'Scroll the sidebar to see each group label stay visible until the next group takes its place. Sticky positioning is provided by the example styles.',
  },
} as const;
