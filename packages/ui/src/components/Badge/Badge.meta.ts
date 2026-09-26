import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const badgeMetadata = {
  name: 'Badge',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description: 'Attaches a compact count or status marker to another element, or renders inline.',
  import: "import { Badge } from '@virgo-design/ui';",
  intents: ['default', 'success', 'warning', 'danger', 'info'].map((name) => ({
    name,
    description: 'Theme-aware semantic indicator color.',
  })),
  states: ['count', 'overflow', 'zero-hidden', 'zero-visible', 'dot', 'standalone'],
  anatomy: [
    { name: 'Badge', description: 'Relative host wrapper or standalone inline container.' },
    { name: 'indicator', description: 'Non-interactive count or dot marker.' },
  ],
  capabilities: {
    numericCount: true,
    shortText: true,
    maxCount: true,
    showZero: true,
    dot: true,
    standalone: true,
    overlayEngine: false,
  },
  accessibility: [
    'Badge never enters the tab order and does not intercept pointer interaction with its host.',
    'Numeric and short text content remain readable by assistive technology.',
    'Meaningful dots need an aria-label because color alone cannot communicate their state.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
