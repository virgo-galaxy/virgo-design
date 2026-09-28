export const primitiveCategories = [
  'Actions & Commands',
  'Form Controls',
  'Disclosure',
  'Navigation',
  'Menus',
  'Overlays',
  'Feedback',
  'Structure',
] as const;

export type PrimitiveCategory = (typeof primitiveCategories)[number];

export interface PrimitiveDoc {
  exportName: string;
  slug: string;
  category: PrimitiveCategory;
  description: string;
}

export const primitiveDocs = [
  {
    exportName: 'Button',
    slug: 'button',
    category: 'Actions & Commands',
    description:
      'A native button that preserves platform semantics, events, and disabled behavior.',
  },
  {
    exportName: 'Command',
    slug: 'command',
    category: 'Actions & Commands',
    description:
      'A searchable command collection with filtering, selection, and keyboard navigation.',
  },
  {
    exportName: 'Checkbox',
    slug: 'checkbox',
    category: 'Form Controls',
    description: 'Native checkboxes with mixed state and optional controlled group coordination.',
  },
  {
    exportName: 'Input',
    slug: 'input',
    category: 'Form Controls',
    description:
      'A transparent native input with ref forwarding and the full platform attribute surface.',
  },
  {
    exportName: 'Radio',
    slug: 'radio',
    category: 'Form Controls',
    description:
      'Native radio inputs with optional single-value group state and orientation semantics.',
  },
  {
    exportName: 'Select',
    slug: 'select',
    category: 'Form Controls',
    description:
      'A headless listbox with controlled value, typeahead, keyboard navigation, and form support.',
  },
  {
    exportName: 'Switch',
    slug: 'switch',
    category: 'Form Controls',
    description:
      'A native checkbox enhanced with switch semantics and checked-state notifications.',
  },
  {
    exportName: 'Textarea',
    slug: 'textarea',
    category: 'Form Controls',
    description: 'A transparent native textarea with ref forwarding and native state behavior.',
  },
  {
    exportName: 'Accordion',
    slug: 'accordion',
    category: 'Disclosure',
    description: 'Single or multiple disclosure sections with coordinated state and roving focus.',
  },
  {
    exportName: 'Collapsible',
    slug: 'collapsible',
    category: 'Disclosure',
    description: 'A controlled or uncontrolled disclosure region with connected trigger semantics.',
  },
  {
    exportName: 'Tabs',
    slug: 'tabs',
    category: 'Disclosure',
    description: 'An accessible tab set with automatic selection and arrow-key navigation.',
  },
  {
    exportName: 'Breadcrumb',
    slug: 'breadcrumb',
    category: 'Navigation',
    description: 'A labelled breadcrumb navigation with ordered items and current-page semantics.',
  },
  {
    exportName: 'NavigationMenu',
    slug: 'navigation-menu',
    category: 'Navigation',
    description:
      'Top-level links and disclosures coordinated across horizontal or vertical navigation.',
  },
  {
    exportName: 'Pagination',
    slug: 'pagination',
    category: 'Navigation',
    description: 'Bounded page state and native page controls for finite result collections.',
  },
  {
    exportName: 'ContextMenu',
    slug: 'context-menu',
    category: 'Menus',
    description:
      'A menu opened at pointer coordinates or with the native context-menu keyboard gesture.',
  },
  {
    exportName: 'Dropdown',
    slug: 'dropdown',
    category: 'Menus',
    description: 'A positioned action menu opened by click, keyboard, touch, or optional hover.',
  },
  {
    exportName: 'Menu',
    slug: 'menu',
    category: 'Menus',
    description: 'A composable action menu with selection, typeahead, checked items, and submenus.',
  },
  {
    exportName: 'Menubar',
    slug: 'menubar',
    category: 'Menus',
    description: 'A coordinated row of menus with roving focus and cross-menu keyboard navigation.',
  },
  {
    exportName: 'Dialog',
    slug: 'dialog',
    category: 'Overlays',
    description:
      'A modal or non-modal dialog with focus management, dismissal, and layered isolation.',
  },
  {
    exportName: 'Popover',
    slug: 'popover',
    category: 'Overlays',
    description:
      'A non-modal positioned panel with click or hover activation and focus coordination.',
  },
  {
    exportName: 'Tooltip',
    slug: 'tooltip',
    category: 'Overlays',
    description:
      'A delayed hover or focus description with positioning and optional smooth handoff.',
  },
  {
    exportName: 'Toast',
    slug: 'toast',
    category: 'Feedback',
    description:
      'Portalled live-region notifications with timed dismissal, pause, and focus hotkey support.',
  },
  {
    exportName: 'Layout',
    slug: 'layout',
    category: 'Structure',
    description:
      'Semantic page regions with coordinated sidebar collapse state and structural ordering.',
  },
  {
    exportName: 'Dock',
    slug: 'dock',
    category: 'Structure',
    description:
      'Edge-constrained movable regions with normalized snapped or continuous placement and orientation state.',
  },
] as const satisfies ReadonlyArray<PrimitiveDoc>;

export type PrimitiveSlug = (typeof primitiveDocs)[number]['slug'];

export interface PrimitiveDetail {
  parts: readonly string[];
  partNote?: string;
  behaviors: readonly string[];
  accessibility: readonly string[];
  publicApi: readonly string[];
}

export const primitiveDetails = {
  button: {
    parts: [],
    partNote: 'A single native button element; there are no compound parts.',
    behaviors: [
      'Defaults to type="button" while allowing an explicit native button type.',
      'Forwards native attributes, events, disabled state, and the element ref.',
    ],
    accessibility: ['Uses native button semantics and native keyboard activation.'],
    publicApi: ['Button', 'ButtonProps'],
  },
  command: {
    parts: ['Root', 'Input', 'List', 'Empty', 'Group', 'Item', 'Separator'],
    behaviors: [
      'Filters item values, labels, and keywords with an overridable filter function.',
      'Keeps focus in the input while Arrow keys, Home, End, and Enter navigate and select.',
      'Supports controlled search and active-value state as well as dynamic item registration.',
    ],
    accessibility: [
      'Connects a combobox input to a listbox and exposes active descendants.',
      'Items use option semantics, including selected and disabled states.',
    ],
    publicApi: [
      'Command',
      'Command.Root',
      'Command.Input',
      'Command.List',
      'Command.Empty',
      'Command.Group',
      'Command.Item',
      'Command.Separator',
    ],
  },
  checkbox: {
    parts: ['Checkbox', 'Checkbox.Group'],
    behaviors: [
      'Renders a native checkbox and supports the browser checked and disabled behavior.',
      'Adds a persistent indeterminate state and optional controlled or uncontrolled group values.',
      'A group can supply a shared native name and disabled state.',
    ],
    accessibility: [
      'Uses a native checkbox input.',
      'Indeterminate checkboxes expose aria-checked="mixed".',
    ],
    publicApi: ['Checkbox', 'Checkbox.Group', 'CheckboxProps', 'CheckboxGroupProps'],
  },
  input: {
    parts: [],
    partNote: 'A single native input element; there are no compound parts.',
    behaviors: [
      'Defaults to type="text" and accepts the complete native input attribute surface.',
      'Forwards change events, disabled and read-only state, and the element ref.',
    ],
    accessibility: ['Retains native input semantics; consumers provide the accessible label.'],
    publicApi: ['Input', 'InputProps'],
  },
  radio: {
    parts: ['Radio', 'Radio.Group'],
    behaviors: [
      'Renders native radio inputs and optionally coordinates one selected group value.',
      'Supports controlled or uncontrolled group state, shared names, and group-level disabling.',
    ],
    accessibility: [
      'Uses native radio inputs inside a radiogroup.',
      'The group exposes horizontal or vertical orientation semantics.',
    ],
    publicApi: ['Radio', 'Radio.Group', 'RadioProps', 'RadioGroupProps'],
  },
  select: {
    parts: ['Root', 'Trigger', 'Content', 'Option'],
    behaviors: [
      'Coordinates controlled or uncontrolled value and open state.',
      'Supports Arrow keys, Home, End, Enter, Escape, and character typeahead.',
      'Can submit its selected value through a hidden native input when given a name.',
    ],
    accessibility: [
      'The trigger controls a listbox and exposes expanded state.',
      'Options expose selected and disabled semantics and keyboard focus management.',
    ],
    publicApi: ['Select', 'Select.Trigger', 'Select.Content', 'Select.Option'],
  },
  switch: {
    parts: [],
    partNote: 'A single native checkbox input with switch semantics; there are no compound parts.',
    behaviors: [
      'Supports native controlled and uncontrolled checked state.',
      'Calls onCheckedChange after uncancelled native change events.',
    ],
    accessibility: ['Uses a native checkbox input with role="switch".'],
    publicApi: ['Switch', 'SwitchProps'],
  },
  textarea: {
    parts: [],
    partNote: 'A single native textarea element; there are no compound parts.',
    behaviors: [
      'Accepts native textarea attributes and browser editing behavior.',
      'Forwards change events, disabled and read-only state, and the element ref.',
    ],
    accessibility: ['Retains native textarea semantics; consumers provide the accessible label.'],
    publicApi: ['Textarea', 'TextareaProps'],
  },
  accordion: {
    parts: ['Root', 'Item', 'Trigger', 'Content'],
    behaviors: [
      'Supports controlled or uncontrolled single and multiple expansion modes.',
      'Arrow keys, Home, and End move focus between enabled triggers.',
      'Disabled items cannot toggle and are skipped by roving focus.',
    ],
    accessibility: [
      'Each trigger and content region is connected with stable accessible ids.',
      'Item triggers sit inside configurable semantic heading levels.',
    ],
    publicApi: [
      'Accordion',
      'Accordion.Root',
      'Accordion.Item',
      'Accordion.Trigger',
      'Accordion.Content',
    ],
  },
  collapsible: {
    parts: ['Root', 'Trigger', 'Content'],
    behaviors: [
      'Supports controlled or uncontrolled open state.',
      'The trigger toggles content unless its native event is cancelled.',
    ],
    accessibility: [
      'Trigger and content are connected through aria-controls and labelled region semantics.',
      'The trigger exposes its current expanded state.',
    ],
    publicApi: ['Collapsible', 'Collapsible.Root', 'Collapsible.Trigger', 'Collapsible.Content'],
  },
  tabs: {
    parts: ['Root', 'List', 'Tab', 'Panel'],
    behaviors: [
      'Supports controlled or uncontrolled active values and chooses the first enabled tab by default.',
      'ArrowLeft, ArrowRight, Home, and End move focus and selection while skipping disabled tabs.',
    ],
    accessibility: [
      'Exposes tablist, tab, and tabpanel roles.',
      'Every tab and panel pair receives matching ids and control relationships.',
    ],
    publicApi: ['Tabs', 'Tabs.List', 'Tabs.Tab', 'Tabs.Panel'],
  },
  breadcrumb: {
    parts: ['Root', 'Item'],
    behaviors: [
      'Renders items in path order and inserts an accessibility-hidden separator.',
      'Items become native links when href is present or current-page spans when it is absent.',
    ],
    accessibility: [
      'Uses a labelled navigation landmark with an ordered list.',
      'The current item defaults to aria-current="page".',
    ],
    publicApi: ['Breadcrumb', 'Breadcrumb.Item', 'BreadcrumbProps', 'BreadcrumbItemProps'],
  },
  'navigation-menu': {
    parts: ['Root', 'List', 'Item', 'Link', 'Trigger', 'Content'],
    behaviors: [
      'Coordinates active links and controlled or uncontrolled disclosure state.',
      'Directional keys follow horizontal or vertical orientation and skip disabled controls.',
      'Nested content returns focus to its trigger when dismissed with Escape.',
    ],
    accessibility: [
      'Uses a native navigation landmark and list structure.',
      'Active links expose aria-current and disclosure triggers expose expanded relationships.',
    ],
    publicApi: [
      'NavigationMenu',
      'NavigationMenu.List',
      'NavigationMenu.Item',
      'NavigationMenu.Link',
      'NavigationMenu.Trigger',
      'NavigationMenu.Content',
    ],
  },
  pagination: {
    parts: ['Root', 'Item'],
    behaviors: [
      'Calculates bounded page ranges and a compact item sequence for large totals.',
      'Supports controlled or uncontrolled page and page-size state.',
      'Clamps invalid or stale pages when totals change.',
    ],
    accessibility: [
      'Uses a labelled pagination navigation landmark.',
      'Numbered page buttons expose aria-current for the active page.',
    ],
    publicApi: ['Pagination', 'Pagination.Item', 'PaginationProps', 'PaginationState'],
  },
  'context-menu': {
    parts: [
      'Root',
      'Trigger',
      'Content',
      'Item',
      'CheckboxItem',
      'RadioGroup',
      'RadioItem',
      'Group',
      'Separator',
      'Submenu',
    ],
    behaviors: [
      'Opens at pointer coordinates and repositions when invoked again.',
      'Also opens from Shift+F10 or the Context Menu key.',
      'Reuses Menu item, checked-state, selection, submenu, and dismissal behavior.',
    ],
    accessibility: [
      'Moves focus into the opened menu and restores it to the context target on close.',
      'Items expose menuitem, menuitemcheckbox, or menuitemradio semantics as appropriate.',
    ],
    publicApi: ['ContextMenu', 'ContextMenu.Trigger', 'ContextMenu.Content', 'ContextMenu.Item'],
  },
  dropdown: {
    parts: ['Root', 'Trigger', 'Content', 'Item', 'Separator'],
    behaviors: [
      'Supports click activation and optional hover activation without losing keyboard or touch support.',
      'Positions, flips, and shifts portalled content at viewport edges.',
      'Supports wrapping keyboard navigation, typeahead, selection cancellation, and outside dismissal.',
    ],
    accessibility: [
      'The trigger owns a labelled menu and exposes expanded state.',
      'Focus enters enabled menu items and returns to the trigger when appropriate.',
    ],
    publicApi: [
      'Dropdown',
      'Dropdown.Trigger',
      'Dropdown.Content',
      'Dropdown.Item',
      'Dropdown.Separator',
    ],
  },
  menu: {
    parts: [
      'Root',
      'Trigger',
      'Content',
      'Item',
      'CheckboxItem',
      'RadioGroup',
      'RadioItem',
      'Group',
      'Separator',
      'Submenu',
      'SubmenuTrigger',
      'SubmenuContent',
    ],
    behaviors: [
      'Supports controlled or uncontrolled open state, typeahead, wrapping focus, and cancellable selection.',
      'Checkbox and radio items maintain selection without closing by default.',
      'Nested submenus coordinate pointer travel, keyboard direction, and layered Escape dismissal.',
    ],
    accessibility: [
      'Uses menu and menuitem roles with checked variants where applicable.',
      'Keyboard navigation supports Arrow keys, Home, End, Enter, Escape, and Tab exit.',
    ],
    publicApi: ['Menu', 'Menu.Trigger', 'Menu.Content', 'Menu.Item', 'Menu.Submenu'],
  },
  menubar: {
    parts: ['Root', 'Menu', 'Trigger', 'Content', 'Item'],
    behaviors: [
      'Coordinates one open top-level menu and shares the complete Menu item implementation.',
      'Horizontal keys, Home, and End move the single tab stop between menu triggers.',
      'Open menus switch from keys or hover while an idle menubar remains closed.',
    ],
    accessibility: [
      'Uses menubar and menuitem semantics with one top-level tab stop.',
      'Escape closes the active menu and restores focus to its trigger.',
    ],
    publicApi: ['Menubar', 'Menubar.Menu', 'Menubar.Trigger', 'Menubar.Content', 'Menubar.Item'],
  },
  dialog: {
    parts: ['Root', 'Trigger', 'Portal', 'Overlay', 'Content', 'Title', 'Description', 'Close'],
    behaviors: [
      'Supports controlled or uncontrolled modal and non-modal open state.',
      'Portals content, coordinates nested layers, handles outside and Escape dismissal, and restores focus.',
      'Modal dialogs isolate background interaction and trap Tab navigation.',
    ],
    accessibility: [
      'Content uses dialog semantics and links mounted title and description ids.',
      'Focus moves into the dialog on open and returns to the trigger on close unless cancelled.',
    ],
    publicApi: [
      'Dialog',
      'Dialog.Trigger',
      'Dialog.Portal',
      'Dialog.Overlay',
      'Dialog.Content',
      'Dialog.Title',
      'Dialog.Description',
      'Dialog.Close',
    ],
  },
  popover: {
    parts: ['Root', 'Trigger', 'Content', 'Close'],
    behaviors: [
      'Supports click or hover activation, controlled state, positioning, and outside dismissal.',
      'Coordinates nested portalled overlays and optional focus restoration.',
      'Interactive hover content remains open across pointer gaps and while focus is inside.',
    ],
    accessibility: [
      'Uses non-modal dialog semantics and derives a default name from the trigger.',
      'Keyboard focus enters interactive content and Escape restores trigger focus.',
    ],
    publicApi: ['Popover', 'Popover.Trigger', 'Popover.Content', 'Popover.Close'],
  },
  tooltip: {
    parts: ['Root', 'Trigger', 'Content'],
    behaviors: [
      'closeOnClick defaults to true; false keeps dynamic descriptions open during trigger activation.',
      'Opens after a configurable hover delay or immediately from keyboard focus.',
      'Supports controlled state, viewport-aware positioning, gap crossing, and optional smooth handoff.',
      'Dismisses with Escape, disabled state, unmount, or when the trigger leaves the viewport.',
    ],
    accessibility: [
      'Connects tooltip content to the trigger description without moving focus.',
      'Ignores touch hover and preserves native trigger actions.',
    ],
    publicApi: ['Tooltip', 'Tooltip.Trigger', 'Tooltip.Content'],
  },
  toast: {
    parts: ['Provider', 'Root', 'Title', 'Description', 'Action', 'Close', 'Viewport'],
    behaviors: [
      'Portals open toasts into a shared viewport and supports controlled or uncontrolled state.',
      'Auto-dismiss timing pauses while pointer or focus is inside.',
      'Multiple toasts stack and the provider hotkey moves focus into the viewport.',
    ],
    accessibility: [
      'Uses polite status or assertive alert live-region semantics.',
      'Mounted title and description parts provide accessible relationships without stealing focus.',
    ],
    publicApi: [
      'Toast',
      'Toast.Provider',
      'Toast.Root',
      'Toast.Title',
      'Toast.Description',
      'Toast.Action',
      'Toast.Close',
      'Toast.Viewport',
    ],
  },
  dock: {
    parts: ['Boundary', 'Root', 'Handle', 'Content'],
    behaviors: [
      'Constrains placement to a configurable subset of the four edges of a local boundary.',
      'Supports configurable equal snap divisions or continuous free positioning while deriving horizontal or vertical orientation.',
      'Supports pointer dragging plus arrow, Home, End, and Alt+Arrow keyboard repositioning across enabled edges.',
      'Can persist uncontrolled placement to localStorage or sessionStorage with an explicit consumer-owned key.',
      'Places the dedicated movement handle at the logical start or end across horizontal and vertical orientations.',
      'Exposes independent controlled or uncontrolled locked and pinned state: locking blocks movement, while pinning selects fixed positioning without blocking movement.',
    ],
    accessibility: [
      'Uses a native button as the dedicated movement handle so docked content remains independently interactive.',
      'The handle exposes a default accessible name, logical start/end placement, and keyboard shortcuts for movement and edge changes.',
    ],
    publicApi: ['Dock', 'Dock.Boundary', 'Dock.Handle', 'Dock.Content'],
  },
  layout: {
    parts: ['Root', 'Header', 'Lane', 'Sidebar', 'SidebarTrigger', 'Content', 'Footer'],
    behaviors: [
      'Arranges structural regions vertically by default or horizontally when requested.',
      'Provides a neutral Lane boundary whose composition direction stays independent from semantic Content sizing.',
      'Coordinates controlled or uncontrolled sidebar collapse state and custom trigger rendering.',
      'Supports multiple independent sidebars and render-function access to sidebar state.',
    ],
    accessibility: [
      'Renders header, aside, main, and footer regions with native semantic elements while Lane remains a neutral div.',
      'The sidebar trigger exposes and changes its expanded state from keyboard activation.',
    ],
    publicApi: [
      'Layout',
      'Layout.Header',
      'Layout.Lane',
      'Layout.Sidebar',
      'Layout.SidebarTrigger',
      'Layout.Content',
      'Layout.Footer',
    ],
  },
} as const satisfies Record<PrimitiveSlug, PrimitiveDetail>;

export function getPrimitiveDoc(slug: string): (PrimitiveDoc & PrimitiveDetail) | undefined {
  const summary = primitiveDocs.find((doc) => doc.slug === slug);

  if (!summary) {
    return undefined;
  }

  return { ...summary, ...primitiveDetails[summary.slug] };
}
