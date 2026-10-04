import type { ParseKeys } from 'i18next';
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
  description: ParseKeys;
}

export const primitiveDocs = [
  {
    exportName: 'Carousel',
    slug: 'carousel',
    category: 'Navigation',
    description: 'primitives.docs.carousel.description',
  },
  {
    exportName: 'Slider',
    slug: 'slider',
    category: 'Form Controls',
    description: 'primitives.docs.slider.description',
  },
  {
    exportName: 'ColorPicker',
    slug: 'color-picker',
    category: 'Form Controls',
    description: 'primitives.docs.color-picker.description',
  },
  {
    exportName: 'TimePicker',
    slug: 'time-picker',
    category: 'Form Controls',
    description: 'primitives.docs.time-picker.description',
  },
  {
    exportName: 'DatePicker',
    slug: 'date-picker',
    category: 'Form Controls',
    description: 'primitives.docs.date-picker.description',
  },
  {
    exportName: 'Calendar',
    slug: 'calendar',
    category: 'Form Controls',
    description: 'primitives.docs.calendar.description',
  },
  {
    exportName: 'Timeline',
    slug: 'timeline',
    category: 'Structure',
    description: 'primitives.docs.timeline.description',
  },

  {
    exportName: 'Form',
    slug: 'form',
    category: 'Form Controls',
    description: 'primitives.docs.form.description',
  },
  {
    exportName: 'Field',
    slug: 'field',
    category: 'Form Controls',
    description: 'primitives.docs.field.description',
  },
  {
    exportName: 'Table',
    slug: 'table',
    category: 'Structure',
    description: 'primitives.docs.table.description',
  },
  {
    exportName: 'Tree',
    slug: 'tree',
    category: 'Navigation',
    description: 'primitives.docs.tree.description',
  },
  {
    exportName: 'Combobox',
    slug: 'combobox',
    category: 'Form Controls',
    description: 'primitives.docs.combobox.description',
  },

  {
    exportName: 'Cursor',
    slug: 'cursor',
    category: 'Overlays',
    description: 'primitives.docs.cursor.description',
  },
  {
    exportName: 'Button',
    slug: 'button',
    category: 'Actions & Commands',
    description: 'primitives.docs.button.description',
  },
  {
    exportName: 'Command',
    slug: 'command',
    category: 'Actions & Commands',
    description: 'primitives.docs.command.description',
  },
  {
    exportName: 'Checkbox',
    slug: 'checkbox',
    category: 'Form Controls',
    description: 'primitives.docs.checkbox.description',
  },
  {
    exportName: 'Input',
    slug: 'input',
    category: 'Form Controls',
    description: 'primitives.docs.input.description',
  },
  {
    exportName: 'Radio',
    slug: 'radio',
    category: 'Form Controls',
    description: 'primitives.docs.radio.description',
  },
  {
    exportName: 'Select',
    slug: 'select',
    category: 'Form Controls',
    description: 'primitives.docs.select.description',
  },
  {
    exportName: 'Switch',
    slug: 'switch',
    category: 'Form Controls',
    description: 'primitives.docs.switch.description',
  },
  {
    exportName: 'Textarea',
    slug: 'textarea',
    category: 'Form Controls',
    description: 'primitives.docs.textarea.description',
  },
  {
    exportName: 'Accordion',
    slug: 'accordion',
    category: 'Disclosure',
    description: 'primitives.docs.accordion.description',
  },
  {
    exportName: 'Collapsible',
    slug: 'collapsible',
    category: 'Disclosure',
    description: 'primitives.docs.collapsible.description',
  },
  {
    exportName: 'Tabs',
    slug: 'tabs',
    category: 'Disclosure',
    description: 'primitives.docs.tabs.description',
  },
  {
    exportName: 'Breadcrumb',
    slug: 'breadcrumb',
    category: 'Navigation',
    description: 'primitives.docs.breadcrumb.description',
  },
  {
    exportName: 'NavigationMenu',
    slug: 'navigation-menu',
    category: 'Navigation',
    description: 'primitives.docs.navigation-menu.description',
  },
  {
    exportName: 'Pagination',
    slug: 'pagination',
    category: 'Navigation',
    description: 'primitives.docs.pagination.description',
  },
  {
    exportName: 'ContextMenu',
    slug: 'context-menu',
    category: 'Menus',
    description: 'primitives.docs.context-menu.description',
  },
  {
    exportName: 'Dropdown',
    slug: 'dropdown',
    category: 'Menus',
    description: 'primitives.docs.dropdown.description',
  },
  {
    exportName: 'Menu',
    slug: 'menu',
    category: 'Menus',
    description: 'primitives.docs.menu.description',
  },
  {
    exportName: 'Menubar',
    slug: 'menubar',
    category: 'Menus',
    description: 'primitives.docs.menubar.description',
  },
  {
    exportName: 'Dialog',
    slug: 'dialog',
    category: 'Overlays',
    description: 'primitives.docs.dialog.description',
  },
  {
    exportName: 'Popover',
    slug: 'popover',
    category: 'Overlays',
    description: 'primitives.docs.popover.description',
  },
  {
    exportName: 'Tooltip',
    slug: 'tooltip',
    category: 'Overlays',
    description: 'primitives.docs.tooltip.description',
  },
  {
    exportName: 'Toast',
    slug: 'toast',
    category: 'Feedback',
    description: 'primitives.docs.toast.description',
  },
  {
    exportName: 'Layout',
    slug: 'layout',
    category: 'Structure',
    description: 'primitives.docs.layout.description',
  },
  {
    exportName: 'Dock',
    slug: 'dock',
    category: 'Structure',
    description: 'primitives.docs.dock.description',
  },
] as const satisfies ReadonlyArray<PrimitiveDoc>;

export type PrimitiveSlug = (typeof primitiveDocs)[number]['slug'];

export interface PrimitiveDetail {
  parts: readonly string[];
  partNote?: ParseKeys | undefined;
  behaviors: readonly ParseKeys[];
  accessibility: readonly ParseKeys[];
  publicApi: readonly string[];
}

export const primitiveDetails = {
  carousel: {
    parts: ['Root', 'Viewport', 'Track', 'Item'],
    behaviors: ['primitives.docs.carousel.behavior'],
    accessibility: ['primitives.docs.carousel.accessibility'],
    publicApi: [
      'Carousel',
      'Carousel.Viewport',
      'Carousel.Track',
      'Carousel.Item',
      'useCarouselState',
    ],
  },
  slider: {
    parts: [],
    behaviors: ['primitives.docs.slider.behavior'],
    accessibility: ['primitives.docs.slider.accessibility'],
    publicApi: ['Slider'],
  },
  'color-picker': {
    parts: ['Input', 'Swatch', 'Preview'],
    behaviors: ['primitives.docs.color-picker.behavior'],
    accessibility: ['primitives.docs.color-picker.accessibility'],
    publicApi: ['ColorPicker', 'ColorPicker.Input', 'ColorPicker.Swatch', 'ColorPicker.Preview'],
  },
  'time-picker': {
    parts: [],
    behaviors: ['primitives.docs.time-picker.behavior'],
    accessibility: ['primitives.docs.time-picker.accessibility'],
    publicApi: ['TimePicker'],
  },
  'date-picker': {
    parts: ['Input', 'Trigger', 'Content', 'Calendar'],
    behaviors: ['primitives.docs.date-picker.behavior'],
    accessibility: ['primitives.docs.date-picker.accessibility'],
    publicApi: [
      'DatePicker',
      'DatePicker.Input',
      'DatePicker.Trigger',
      'DatePicker.Content',
      'DatePicker.Calendar',
    ],
  },
  calendar: {
    parts: [],
    behaviors: ['primitives.docs.calendar.behavior'],
    accessibility: ['primitives.docs.calendar.accessibility'],
    publicApi: ['Calendar'],
  },
  timeline: {
    parts: ['Item', 'Title', 'Description', 'Time', 'Indicator'],
    behaviors: ['primitives.docs.timeline.behavior'],
    accessibility: ['primitives.docs.timeline.accessibility'],
    publicApi: [
      'Timeline',
      'Timeline.Item',
      'Timeline.Title',
      'Timeline.Description',
      'Timeline.Time',
      'Timeline.Indicator',
    ],
  },

  form: {
    parts: [],
    behaviors: ['primitives.docs.form.behavior'],
    accessibility: ['primitives.docs.form.accessibility'],
    publicApi: ['Form'],
  },
  field: {
    parts: ['Root', 'Label', 'Description', 'Message', 'Control'],
    behaviors: ['primitives.docs.field.behavior'],
    accessibility: ['primitives.docs.field.accessibility'],
    publicApi: ['Field', 'Field.Label', 'Field.Description', 'Field.Message', 'Field.Control'],
  },
  table: {
    parts: [
      'Root',
      'Caption',
      'Header',
      'Body',
      'Footer',
      'Row',
      'Head',
      'Cell',
      'Viewport',
      'SortButton',
    ],
    behaviors: ['primitives.docs.table.behavior'],
    accessibility: ['primitives.docs.table.accessibility'],
    publicApi: [
      'Table',
      'Table.Caption',
      'Table.SortButton',
      'Table.Header',
      'Table.Body',
      'Table.Footer',
      'Table.Row',
      'Table.Head',
      'Table.Cell',
      'Table.Viewport',
    ],
  },
  tree: {
    parts: ['Root', 'Item', 'Label', 'Toggle', 'Group'],
    behaviors: ['primitives.docs.tree.behavior'],
    accessibility: ['primitives.docs.tree.accessibility'],
    publicApi: ['Tree', 'Tree.Item', 'Tree.Label', 'Tree.Toggle', 'Tree.Group'],
  },
  combobox: {
    parts: ['Root', 'Input', 'Content', 'Option', 'Empty', 'Group', 'Clear'],
    behaviors: ['primitives.docs.combobox.behavior'],
    accessibility: ['primitives.docs.combobox.accessibility'],
    publicApi: [
      'Combobox',
      'Combobox.Input',
      'Combobox.Content',
      'Combobox.Option',
      'Combobox.Empty',
      'Combobox.Group',
      'Combobox.Clear',
    ],
  },

  cursor: {
    parts: ['Provider', 'Follower', 'usePointer'],
    behaviors: [
      'primitives.docs.cursor.behaviors.item1',
      'primitives.docs.cursor.behaviors.item2',
      'primitives.docs.cursor.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.cursor.accessibility.item1',
      'primitives.docs.cursor.accessibility.item2',
    ],
    publicApi: ['Cursor.Provider', 'Cursor.Follower', 'Cursor.usePointer'],
  },
  button: {
    parts: [],
    partNote: 'primitives.docs.button.partNote',
    behaviors: ['primitives.docs.button.behaviors.item1', 'primitives.docs.button.behaviors.item2'],
    accessibility: ['primitives.docs.button.accessibility.item1'],
    publicApi: ['Button', 'ButtonProps'],
  },
  command: {
    parts: ['Root', 'Input', 'List', 'Empty', 'Group', 'Item', 'Separator'],
    behaviors: [
      'primitives.docs.command.behaviors.item1',
      'primitives.docs.command.behaviors.item2',
      'primitives.docs.command.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.command.accessibility.item1',
      'primitives.docs.command.accessibility.item2',
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
      'primitives.docs.checkbox.behaviors.item1',
      'primitives.docs.checkbox.behaviors.item2',
      'primitives.docs.checkbox.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.checkbox.accessibility.item1',
      'primitives.docs.checkbox.accessibility.item2',
    ],
    publicApi: ['Checkbox', 'Checkbox.Group', 'CheckboxProps', 'CheckboxGroupProps'],
  },
  input: {
    parts: [],
    partNote: 'primitives.docs.input.partNote',
    behaviors: ['primitives.docs.input.behaviors.item1', 'primitives.docs.input.behaviors.item2'],
    accessibility: ['primitives.docs.input.accessibility.item1'],
    publicApi: ['Input', 'InputProps'],
  },
  radio: {
    parts: ['Radio', 'Radio.Group'],
    behaviors: ['primitives.docs.radio.behaviors.item1', 'primitives.docs.radio.behaviors.item2'],
    accessibility: [
      'primitives.docs.radio.accessibility.item1',
      'primitives.docs.radio.accessibility.item2',
    ],
    publicApi: ['Radio', 'Radio.Group', 'RadioProps', 'RadioGroupProps'],
  },
  select: {
    parts: ['Root', 'Multiple', 'Trigger', 'Content', 'Option', 'Remove'],
    behaviors: [
      'primitives.docs.select.behaviors.item1',
      'primitives.docs.select.behaviors.item2',
      'primitives.docs.select.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.select.accessibility.item1',
      'primitives.docs.select.accessibility.item2',
    ],
    publicApi: [
      'Select',
      'Select.Multiple',
      'Select.Trigger',
      'Select.Content',
      'Select.Option',
      'Select.Remove',
    ],
  },
  switch: {
    parts: [],
    partNote: 'primitives.docs.switch.partNote',
    behaviors: ['primitives.docs.switch.behaviors.item1', 'primitives.docs.switch.behaviors.item2'],
    accessibility: ['primitives.docs.switch.accessibility.item1'],
    publicApi: ['Switch', 'SwitchProps'],
  },
  textarea: {
    parts: [],
    partNote: 'primitives.docs.textarea.partNote',
    behaviors: [
      'primitives.docs.textarea.behaviors.item1',
      'primitives.docs.input.behaviors.item2',
    ],
    accessibility: ['primitives.docs.textarea.accessibility.item1'],
    publicApi: ['Textarea', 'TextareaProps'],
  },
  accordion: {
    parts: ['Root', 'Item', 'Trigger', 'Content'],
    behaviors: [
      'primitives.docs.accordion.behaviors.item1',
      'primitives.docs.accordion.behaviors.item2',
      'primitives.docs.accordion.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.accordion.accessibility.item1',
      'primitives.docs.accordion.accessibility.item2',
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
      'primitives.docs.collapsible.behaviors.item1',
      'primitives.docs.collapsible.behaviors.item2',
    ],
    accessibility: [
      'primitives.docs.collapsible.accessibility.item1',
      'primitives.docs.collapsible.accessibility.item2',
    ],
    publicApi: ['Collapsible', 'Collapsible.Root', 'Collapsible.Trigger', 'Collapsible.Content'],
  },
  tabs: {
    parts: ['Root', 'List', 'Tab', 'Panel'],
    behaviors: ['primitives.docs.tabs.behaviors.item1', 'primitives.docs.tabs.behaviors.item2'],
    accessibility: [
      'primitives.docs.tabs.accessibility.item1',
      'primitives.docs.tabs.accessibility.item2',
    ],
    publicApi: ['Tabs', 'Tabs.List', 'Tabs.Tab', 'Tabs.Panel'],
  },
  breadcrumb: {
    parts: ['Root', 'Item'],
    behaviors: [
      'primitives.docs.breadcrumb.behaviors.item1',
      'primitives.docs.breadcrumb.behaviors.item2',
    ],
    accessibility: [
      'primitives.docs.breadcrumb.accessibility.item1',
      'primitives.docs.breadcrumb.accessibility.item2',
    ],
    publicApi: ['Breadcrumb', 'Breadcrumb.Item', 'BreadcrumbProps', 'BreadcrumbItemProps'],
  },
  'navigation-menu': {
    parts: ['Root', 'List', 'Item', 'Link', 'Trigger', 'Content'],
    behaviors: [
      'primitives.docs.navigation-menu.behaviors.item1',
      'primitives.docs.navigation-menu.behaviors.item2',
      'primitives.docs.navigation-menu.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.navigation-menu.accessibility.item1',
      'primitives.docs.navigation-menu.accessibility.item2',
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
      'primitives.docs.pagination.behaviors.item1',
      'primitives.docs.pagination.behaviors.item2',
      'primitives.docs.pagination.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.pagination.accessibility.item1',
      'primitives.docs.pagination.accessibility.item2',
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
      'primitives.docs.context-menu.behaviors.item1',
      'primitives.docs.context-menu.behaviors.item2',
      'primitives.docs.context-menu.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.context-menu.accessibility.item1',
      'primitives.docs.context-menu.accessibility.item2',
    ],
    publicApi: ['ContextMenu', 'ContextMenu.Trigger', 'ContextMenu.Content', 'ContextMenu.Item'],
  },
  dropdown: {
    parts: ['Root', 'Trigger', 'Content', 'Item', 'Separator'],
    behaviors: [
      'primitives.docs.dropdown.behaviors.item1',
      'primitives.docs.dropdown.behaviors.item2',
      'primitives.docs.dropdown.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.dropdown.accessibility.item1',
      'primitives.docs.dropdown.accessibility.item2',
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
      'primitives.docs.menu.behaviors.item1',
      'primitives.docs.menu.behaviors.item2',
      'primitives.docs.menu.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.menu.accessibility.item1',
      'primitives.docs.menu.accessibility.item2',
    ],
    publicApi: ['Menu', 'Menu.Trigger', 'Menu.Content', 'Menu.Item', 'Menu.Submenu'],
  },
  menubar: {
    parts: ['Root', 'Menu', 'Trigger', 'Content', 'Item'],
    behaviors: [
      'primitives.docs.menubar.behaviors.item1',
      'primitives.docs.menubar.behaviors.item2',
      'primitives.docs.menubar.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.menubar.accessibility.item1',
      'primitives.docs.menubar.accessibility.item2',
    ],
    publicApi: ['Menubar', 'Menubar.Menu', 'Menubar.Trigger', 'Menubar.Content', 'Menubar.Item'],
  },
  dialog: {
    parts: ['Root', 'Trigger', 'Portal', 'Overlay', 'Content', 'Title', 'Description', 'Close'],
    behaviors: [
      'primitives.docs.dialog.behaviors.item1',
      'primitives.docs.dialog.behaviors.item2',
      'primitives.docs.dialog.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.dialog.accessibility.item1',
      'primitives.docs.dialog.accessibility.item2',
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
      'primitives.docs.popover.behaviors.item1',
      'primitives.docs.popover.behaviors.item2',
      'primitives.docs.popover.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.popover.accessibility.item1',
      'primitives.docs.popover.accessibility.item2',
    ],
    publicApi: ['Popover', 'Popover.Trigger', 'Popover.Content', 'Popover.Close'],
  },
  tooltip: {
    parts: ['Root', 'Trigger', 'Content'],
    behaviors: [
      'primitives.docs.tooltip.behaviors.item1',
      'primitives.docs.tooltip.behaviors.item2',
      'primitives.docs.tooltip.behaviors.item3',
      'primitives.docs.tooltip.behaviors.item4',
    ],
    accessibility: [
      'primitives.docs.tooltip.accessibility.item1',
      'primitives.docs.tooltip.accessibility.item2',
    ],
    publicApi: ['Tooltip', 'Tooltip.Trigger', 'Tooltip.Content'],
  },
  toast: {
    parts: ['Provider', 'Root', 'Title', 'Description', 'Action', 'Close', 'Viewport'],
    behaviors: [
      'primitives.docs.toast.behaviors.item1',
      'primitives.docs.toast.behaviors.item2',
      'primitives.docs.toast.behaviors.item3',
    ],
    accessibility: [
      'primitives.docs.toast.accessibility.item1',
      'primitives.docs.toast.accessibility.item2',
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
      'primitives.docs.dock.behaviors.item1',
      'primitives.docs.dock.behaviors.item2',
      'primitives.docs.dock.behaviors.item3',
      'primitives.docs.dock.behaviors.item4',
      'primitives.docs.dock.behaviors.item5',
      'primitives.docs.dock.behaviors.item6',
    ],
    accessibility: [
      'primitives.docs.dock.accessibility.item1',
      'primitives.docs.dock.accessibility.item2',
    ],
    publicApi: ['Dock', 'Dock.Boundary', 'Dock.Handle', 'Dock.Content'],
  },
  layout: {
    parts: ['Root', 'Header', 'Lane', 'Sidebar', 'SidebarTrigger', 'Content', 'Footer'],
    behaviors: [
      'primitives.docs.layout.behaviors.item1',
      'primitives.docs.layout.behaviors.item2',
      'primitives.docs.layout.behaviors.item3',
      'primitives.docs.layout.behaviors.item4',
    ],
    accessibility: [
      'primitives.docs.layout.accessibility.item1',
      'primitives.docs.layout.accessibility.item2',
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

export function getPrimitiveDoc(
  slug: string,
): (Omit<PrimitiveDoc, 'slug'> & PrimitiveDetail & { slug: PrimitiveSlug }) | undefined {
  const summary = primitiveDocs.find((doc) => doc.slug === slug);

  if (!summary) {
    return undefined;
  }

  const detail: PrimitiveDetail = primitiveDetails[summary.slug];
  return { ...summary, ...detail, partNote: 'partNote' in detail ? detail.partNote : undefined };
}
