import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const dropdownMetadata = {
  name: 'Dropdown',
  package: '@virgo-design/ui',
  category: 'Navigation',
  description:
    'Contextual action menus with hover or click activation, twelve placements and split buttons.',
  import: "import { Dropdown } from '@virgo-design/ui';",
  sizes: ['mini', 'small', 'medium', 'large'].map((name) => ({
    name,
    description: `${name} trigger and menu density.`,
  })),
  states: ['closed', 'open', 'hover', 'focus-visible', 'disabled', 'danger', 'checked'],
  anatomy: [
    { name: 'Dropdown', description: 'Controlled or uncontrolled menu state and activation mode.' },
    {
      name: 'Dropdown.Trigger',
      description: 'Virgo Button with menu ARIA and optional custom indicator.',
    },
    {
      name: 'Dropdown.Content',
      description: 'Portalled menu with collision-aware placement and optional arrow.',
    },
    {
      name: 'Dropdown.Item',
      description: 'Action or checked radio item, optional icon and danger treatment.',
    },
    { name: 'Dropdown.Separator', description: 'Separates groups of menu actions.' },
    { name: 'Dropdown.Button', description: 'Separate main action and labelled menu trigger.' },
  ],
  capabilities: {
    controlled: true,
    uncontrolled: true,
    hover: true,
    click: true,
    placements: true,
    arrow: true,
    icons: true,
    disabled: true,
    danger: true,
    splitButton: true,
    radioItems: true,
    portal: true,
    loading: false,
  },
  accessibility: [
    'Trigger exposes aria-haspopup="menu", aria-expanded and aria-controls; the menu is labelled by its trigger.',
    'Arrow keys wrap enabled items; Home, End and typeahead move focus. Enter and Space activate.',
    'Escape closes and restores trigger focus. Tab closes and continues normal tab order.',
    'Outside pointer or focus dismisses. Hover opening does not steal focus and touch can use click.',
    'Checked items use menuitemradio; disabled items cannot activate. Icon-only triggers need aria-label.',
    'Portals preserve the nearest data-theme and direction, including changes while open.',
  ],
  examples: [
    {
      name: 'Basic',
      code: '<Dropdown><Dropdown.Trigger>Actions</Dropdown.Trigger><Dropdown.Content><Dropdown.Item onSelect={edit}>Edit</Dropdown.Item></Dropdown.Content></Dropdown>',
    },
    {
      name: 'Hover and arrow',
      code: '<Dropdown trigger="hover"><Dropdown.Trigger variant="text">Hover me</Dropdown.Trigger><Dropdown.Content placement="topLeft" arrow><Dropdown.Item>Open</Dropdown.Item></Dropdown.Content></Dropdown>',
    },
    {
      name: 'Split button',
      code: '<Dropdown><Dropdown.Button menuLabel="More actions" onClick={save}>Save</Dropdown.Button><Dropdown.Content><Dropdown.Item>Save as…</Dropdown.Item></Dropdown.Content></Dropdown>',
    },
  ],
} as const satisfies ComponentMetadata;
