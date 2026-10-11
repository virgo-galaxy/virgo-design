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
  sidebarLabels: {
    statistic: 'Labelled metric',
    result: 'Outcome and recovery',
    carousel: 'Content carousel',
    steps: 'Stage sequence',
    collapsible: 'Content disclosure',
    slider: 'Numeric adjustment',
    'color-picker': 'Color selection',
    'time-picker': 'Time entry',
    'date-picker': 'Date selection',
    calendar: 'Month view',
    timeline: 'Event sequence',
    form: 'Submission structure',
    field: 'Label and feedback',
    table: 'Tabular content',
    tree: 'Nested hierarchy',
    combobox: 'Editable selection',
    toolbar: 'Independent actions',
    button: 'Action trigger',
    surface: 'Visual container',
    dock: 'Edge positioning',
    layout: 'Page structure',
    separator: 'Content divider',
    breadcrumb: 'Location trail',
    dropdown: 'Contextual actions',
    'navigation-menu': 'Link navigation',
    pagination: 'Page controls',
    tabs: 'Panel switching',
    checkbox: 'Multiple choice',
    input: 'Text entry',
    radio: 'Single choice',
    'segmented-control': 'Connected choices',
    select: 'Option selection',
    switch: 'Binary state',
    cursor: 'Pointer feedback',
    accordion: 'Content disclosure',
    avatar: 'Identity image',
    badge: 'Count or status',
    card: 'Content grouping',
    empty: 'No content',
    popover: 'Contextual panel',
    tag: 'Metadata marker',
    tooltip: 'Contextual hint',
    alert: 'Inline feedback',
    dialog: 'Focused task',
    drawer: 'Edge panel',
    progress: 'Task completion',
    skeleton: 'Content placeholder',
    spinner: 'Loading indicator',
    toast: 'Transient notification',
    command: 'Search and execute',
    'context-menu': 'Target actions',
    'floating-action': 'Elevated actions',
    menu: 'Action list',
    menubar: 'Action groups',
  },
  metadata: {
    statistic: 'A readable metric with label, value, affixes, change and supporting context.',
    result: 'An outcome with status, title, recovery actions and optional supporting content.',
    carousel: 'Content carousel',
    steps: 'Stage sequence',
    collapsible: 'Content disclosure',
    slider:
      'A native numeric slider with constrained values, keyboard editing and shared field semantics.',
    'color-picker':
      'Opaque sRGB color selection with native input, swatches and a composable HEX/RGB/HSV editing panel.',
    'time-picker':
      'Local time entry with native segmented editing, precision and browser constraint validation.',
    'date-picker': 'Native date entry and a composed calendar popup sharing one civil date value.',
    calendar:
      'A localized month grid with independent selection and display, date constraints and keyboard navigation.',
    timeline:
      'An ordered sequence of events with timestamps, descriptions and progress presentation.',
    form: 'Native form composition and shared field layout. Applications own data, validation and submit state.',
    field:
      'A single-control field with automatic label, description, message and state association.',
    table:
      'Semantic tables with density, alignment, borders and overflow. Data operations belong to the application.',
    tree: 'Accessible nested hierarchy with explicit selection, controlled expansion and keyboard navigation.',
    combobox:
      'Editable single-selection suggestions with filtering, IME-safe keyboard interaction and shared overlay positioning.',

    toolbar: 'Groups independent actions and popup triggers with arrow-key navigation.',
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
      'Organizes related sections into independently or exclusively expandable theme-aware panels.',
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
    toast:
      'Announces brief, non-blocking results as panel notifications or compact feedback, with optional actions and timed dismissal.',
    command: 'Searches and executes application commands from an inline list or dialog palette.',
    'context-menu':
      'Actions for the invoking context, opened at a pointer position or with the keyboard.',
    'floating-action':
      'Circular elevated actions, standalone or grouped in an accessible Popover. Positioning belongs to the containing layout.',
    menu: 'Button-triggered actions with shared checkbox, radio and nested menu items.',
    menubar: 'Application action groups with horizontal focus and open-menu coordination.',
  },
} as const;
