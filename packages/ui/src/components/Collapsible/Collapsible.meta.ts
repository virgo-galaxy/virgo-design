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
  capabilities: { nativeSemantics: true, collapseMotion: true, reducedMotion: true },
  accessibility: [
    'A disclosure button and labelled region with controlled or uncontrolled expansion.',
    'Closed content is inert and hidden from assistive technology, including during collapse transitions.',
    'Collapse motion respects prefers-reduced-motion and exposes token-based duration, easing and content padding variables.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
