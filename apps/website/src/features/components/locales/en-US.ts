export const componentsEnUS = {
  title: 'Components',
  description:
    'Production-ready interface components built from Virgo Design primitives, tokens and interaction patterns.',
  sidebar: 'Components sidebar',
  navigation: 'Component navigation',
  component: 'Component {{index}}',
  status: {
    stable: 'STABLE',
    review: 'REVIEW',
  },
  groups: {
    general: 'General',
    layout: 'Layout',
    navigation: 'Navigation',
    'data-entry': 'Data Entry',
    interaction: 'Interaction',
    'data-display': 'Data Display',
    feedback: 'Feedback',
    actions: 'Actions',
  },
  categories: {
    button: 'Actions',
    surface: 'Appearance',
    dock: 'Layout',
    layout: 'Structure',
    separator: 'Layout',
    breadcrumb: 'Navigation',
    dropdown: 'Navigation',
    'navigation-menu': 'Navigation',
    pagination: 'Navigation',
    tabs: 'Navigation',
    checkbox: 'Forms',
    input: 'Forms',
    radio: 'Forms',
    'segmented-control': 'Forms',
    select: 'Forms',
    switch: 'Forms',
    cursor: 'Interaction',
    accordion: 'Data Display',
    avatar: 'Data Display',
    badge: 'Data Display',
    card: 'Data Display',
    empty: 'Data Display',
    popover: 'Data Display',
    tag: 'Data Display',
    tooltip: 'Data Display',
    alert: 'Feedback',
    dialog: 'Feedback',
    drawer: 'Feedback',
    progress: 'Feedback',
    skeleton: 'Feedback',
    spinner: 'Feedback',
    toast: 'Feedback',
    command: 'Actions',
    'context-menu': 'Actions',
    'floating-action': 'Actions',
    menu: 'Actions',
    menubar: 'Actions',
  },
  metadata: {
    button: 'Triggers an immediate action with a text label or an accessible icon-only control.',
    surface:
      'Gives an existing space a visual skin, decorative background, and material without arranging its content or assigning structural semantics.',
    dock: 'Attaches movable interface regions to boundary edges with snapped or continuous positioning, independent movement locking and fixed pinning, and optional browser persistence.',
    layout:
      'Composes semantic regions and independent spatial lanes with collapsible sidebars, sticky or fixed headers, responsive sizing, and shared Surface treatments. Navigation remains independent.',
    separator: 'Separates adjacent content visually, semantically, or both.',
    breadcrumb:
      'Shows the current location within a hierarchy using native links and a current-page item.',
    dropdown:
      'Contextual action menus with hover or click activation, twelve placements and split buttons.',
    'navigation-menu':
      'Presents horizontal or vertical navigation links with active, disabled, and nested disclosure semantics.',
    pagination:
      'Navigates paged records with bounded page numbers, optional totals, page-size selection and quick jump.',
    tabs: 'Switches between related content panels with standard tab semantics, keyboard navigation, and line, plain, or card visual treatments.',
    checkbox:
      'Toggles an independent boolean choice and supports grouped multi-selection and mixed selection states.',
    input:
      'Accepts a single line of text with optional adornments, clearing, password reveal, and native input semantics.',
    radio: 'Selects exactly one value from a group using standard circular radio controls.',
    'segmented-control':
      'Presents a compact set of mutually exclusive choices as connected segments backed by radio-group semantics.',
    select:
      'Chooses one value from a list of options through a keyboard-accessible Virgo dropdown control.',
    switch:
      'Toggles an immediate binary state with either a familiar pill control or a console-style fader appearance.',
    cursor:
      'Scoped mouse tracking, a translucent Virgo pointer, and reusable pointer-follow feedback.',
    accordion:
      'Organizes related sections into independently or exclusively expandable Classic Virgo panels.',
    avatar: 'Represents a person, team, or entity with an image and resilient fallback.',
    badge: 'Attaches a compact count or status marker to another element, or renders inline.',
    card: 'Organizes a related group of content without adding interaction semantics.',
    empty: 'Structures an application-provided empty-content message and optional action.',
    popover: 'A non-modal floating panel for contextual information and interactive content.',
    tag: 'Displays a compact, standalone piece of classification or status metadata.',
    tooltip: 'A brief, non-interactive description shown on hover or keyboard focus.',
    alert:
      'Displays persistent, inline page or form feedback with semantic intent, structured content, and optional owner-controlled actions.',
    dialog: 'Presents focused content or a short task in a modal or non-modal Virgo overlay panel.',
    drawer:
      'Presents a temporary Dialog-powered workspace panel from a screen edge without introducing a separate interaction protocol.',
    progress: 'Communicates the known completion amount of a determinate task.',
    skeleton: 'Provides a visual content placeholder while a layout is loading.',
    spinner: 'Indicates indeterminate work without managing asynchronous state.',
    toast: 'Announces brief, non-blocking results with optional actions and timed dismissal.',
    command: 'Searches and executes application commands from an inline list or dialog palette.',
    'context-menu':
      'Actions for the invoking context, opened at a pointer position or with the keyboard.',
    'floating-action':
      'Circular elevated actions, standalone or grouped in an accessible Popover. Positioning belongs to the containing layout.',
    menu: 'Button-triggered actions with shared checkbox, radio and nested menu items.',
    menubar: 'Application action groups with horizontal focus and open-menu coordination.',
  },
} as const;
