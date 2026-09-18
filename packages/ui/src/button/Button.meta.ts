import type { ComponentMetadata } from '../metadata/ComponentMetadata';

export const buttonMetadata = {
  name: 'Button',
  package: '@virgo-design/ui',
  category: 'Actions',
  description: 'Triggers an immediate action with a text label or an accessible icon-only control.',
  import: "import { Button } from '@virgo-design/ui';",
  variants: [
    { name: 'primary', description: 'Highest-emphasis action using the brand color.' },
    { name: 'secondary', description: 'Medium-emphasis action on a subtle surface.' },
    { name: 'outline', description: 'Medium-emphasis action with a visible boundary.' },
    { name: 'text', description: 'Low-emphasis action without a persistent container.' },
  ],
  sizes: [
    { name: 'mini', description: '24px height for compact interfaces.' },
    { name: 'small', description: '28px height for dense interfaces.' },
    { name: 'medium', description: '36px height and the default size.' },
    { name: 'large', description: '44px height for prominent actions.' },
  ],
  shapes: [
    { name: 'square', description: 'Default icon-only shape using the size-specific radius.' },
    { name: 'circle', description: 'Circular icon-only shape using the full radius token.' },
  ],
  states: ['default', 'hover', 'active', 'focus-visible', 'disabled'],
  anatomy: [
    { name: 'root', description: 'Native button element supplied by the Button primitive.' },
    {
      name: 'leadingIcon',
      description: 'Optional decorative icon before the visible label in text-button mode.',
    },
    { name: 'label', description: 'Visible action label used by text-button mode.' },
    {
      name: 'trailingIcon',
      description: 'Optional decorative icon after the visible label in text-button mode.',
    },
    { name: 'icon', description: 'Sole visible icon content used by icon-only mode.' },
  ],
  capabilities: {
    leadingIcon: true,
    trailingIcon: true,
    iconOnly: true,
    loading: false,
  },
  accessibility: [
    'Renders a native button with type="button" by default.',
    'Supports native disabled, focus, keyboard, form, and aria attributes.',
    'Shows a visible focus ring for keyboard navigation.',
    'Treats leading and trailing icons as decorative; the visible label provides the name.',
    'Requires aria-label when iconOnly is true so the action keeps an accessible name.',
  ],
  examples: [
    {
      name: 'Primary action',
      code: '<Button>Save changes</Button>',
    },
    {
      name: 'Leading icon',
      code: '<Button leadingIcon={<PlusIcon />}>Create</Button>',
    },
    {
      name: 'Trailing icon',
      code: '<Button variant="secondary" trailingIcon={<ChevronDownIcon />}>Options</Button>',
    },
    {
      name: 'Circular icon action',
      code: '<Button iconOnly shape="circle" aria-label="Settings"><SettingsIcon /></Button>',
    },
  ],
} as const satisfies ComponentMetadata;
