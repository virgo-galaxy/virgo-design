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
] as const satisfies ReadonlyArray<PrimitiveDoc>;
