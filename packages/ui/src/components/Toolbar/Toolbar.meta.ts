import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const toolbarMetadata = {
  name: 'Toolbar',
  package: '@virgo-design/ui',
  category: 'Actions',
  description: 'Groups independent buttons and popup triggers with arrow-key focus navigation.',
  import: "import { Toolbar } from '@virgo-design/ui';",
  states: ['default', 'focus-within'],
  anatomy: [{ name: 'root', description: 'Labelled toolbar containing independent controls.' }],
  capabilities: { keyboardNavigation: true, sizeInheritance: true, customLayout: true },
  accessibility: [
    'Provide aria-label or aria-labelledby.',
    'Use three or more controls; use Button.Group for two actions.',
    'One Tab stop; arrow keys, Home and End move focus between enabled controls.',
    'Popup triggers retain their own menu keyboard interactions.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
