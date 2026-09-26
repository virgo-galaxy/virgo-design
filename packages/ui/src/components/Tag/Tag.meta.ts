import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const tagMetadata = {
  name: 'Tag',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description: 'Displays a compact, standalone piece of classification or status metadata.',
  import: "import { Tag } from '@virgo-design/ui';",
  variants: [
    { name: 'soft', description: 'Subtle filled surface for ordinary metadata.' },
    { name: 'solid', description: 'High-emphasis semantic fill.' },
    { name: 'outline', description: 'Transparent surface with a semantic border.' },
  ],
  sizes: ['sm', 'md', 'lg'].map((name) => ({ name, description: 'Compact Tag density.' })),
  intents: ['neutral', 'brand', 'success', 'warning', 'danger', 'info'].map((name) => ({
    name,
    description: 'Theme-aware semantic color intent.',
  })),
  states: ['default', 'closable', 'focus-visible', 'disabled'],
  anatomy: [
    { name: 'Tag', description: 'Inline metadata container.' },
    { name: 'icon', description: 'Optional decorative leading icon.' },
    { name: 'label', description: 'Visible tag text.' },
    { name: 'close', description: 'Optional accessible close action.' },
  ],
  capabilities: {
    icon: true,
    closable: true,
    controlledRemoval: true,
    selfRemoving: false,
  },
  accessibility: [
    'Static tags do not enter the tab order.',
    'Closable tags render a native button with a configurable accessible label.',
    'Closing only notifies the owner; consumers decide whether to remove the tag.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
