import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const navigationMenuMetadata = {
  name: 'NavigationMenu',
  package: '@virgo-design/ui',
  category: 'Navigation',
  description:
    'Presents horizontal or vertical navigation links with active, disabled, and nested disclosure semantics.',
  import: "import { NavigationMenu } from '@virgo-design/ui';",
  variants: [
    { name: 'default', description: 'Classic Virgo navigation treatment for links and groups.' },
    {
      name: 'segmented',
      description: 'Compact surface treatment for related section destinations.',
    },
  ],
  states: ['default', 'hover', 'focus-visible', 'active', 'disabled', 'expanded'],
  anatomy: [
    { name: 'NavigationMenu.Root', description: 'Navigation landmark and active-state owner.' },
    { name: 'NavigationMenu.List', description: 'Horizontal or vertical top-level link list.' },
    { name: 'NavigationMenu.Item', description: 'Coordinates one stable navigation value.' },
    { name: 'NavigationMenu.Link', description: 'Native link that activates its item.' },
    {
      name: 'NavigationMenu.Separator',
      description: 'Decorative divider that follows the menu orientation automatically.',
    },
    {
      name: 'NavigationMenu.Trigger',
      description: 'Button that discloses a nested navigation list.',
    },
    {
      name: 'NavigationMenu.Content',
      description: 'Nested vertical list labelled and controlled by its trigger.',
    },
  ],
  capabilities: {
    horizontal: true,
    vertical: true,
    controlled: true,
    uncontrolled: true,
    nested: true,
    inlineSubmenu: true,
    popoverSubmenu: true,
    cascadingSubmenu: true,
    disabledItems: true,
    icons: true,
    keyboardNavigation: true,
    themeAware: true,
    routerIntegration: false,
    collapse: false,
  },
  accessibility: [
    'Root renders a native nav landmark; provide a concise aria-label when several landmarks exist.',
    'Links expose aria-current="page" for the active item.',
    'Nested triggers expose aria-expanded and aria-controls.',
    'Arrow keys follow orientation, while Home and End move to the first and last enabled control.',
    'Inline and popover submenus share expanded state, aria relationships, and keyboard behavior.',
    'Popover submenus reuse the shared layer, positioning, dismissal, and focus-return system.',
    'Nested popovers open beside their trigger; ArrowLeft and Escape return to the parent level.',
    'Opening a nested list with its directional key moves focus inside; Escape collapses it and restores trigger focus.',
    'Disabled links remain discoverable while leaving the tab order and preventing activation.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
