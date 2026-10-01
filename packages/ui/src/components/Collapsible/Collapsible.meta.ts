import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const collapsibleMetadata = {
  name: 'Collapsible',
  package: '@virgo-design/ui',
  category: 'Interaction',
  description: 'A disclosure button and labelled region with controlled or uncontrolled expansion.',
  import: "import { Collapsible } from '@virgo-design/ui';",
  states: ['default', 'focus'],
  anatomy: [
    { name: 'Collapsible.Root', description: 'Composition part.' },
    { name: 'Collapsible.Trigger', description: 'Composition part.' },
    { name: 'Collapsible.Content', description: 'Composition part.' },
  ],
  capabilities: { nativeSemantics: true },
  accessibility: [
    'A disclosure button and labelled region with controlled or uncontrolled expansion.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
