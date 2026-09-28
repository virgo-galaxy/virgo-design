import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const separatorMetadata = {
  name: 'Separator',
  package: '@virgo-design/ui',
  category: 'Layout',
  description: 'Separates adjacent content visually, semantically, or both.',
  import: "import { Separator } from '@virgo-design/ui';",
  variants: [
    { name: 'horizontal', description: 'Full-width horizontal rule and default orientation.' },
    { name: 'vertical', description: 'Stretching vertical rule for inline or flex layouts.' },
    { name: 'labeled', description: 'Horizontal rule with a start, center, or end label.' },
  ],
  states: ['semantic', 'decorative'],
  anatomy: [
    { name: 'Separator', description: 'Token-colored layout rule with optional horizontal text.' },
    { name: 'label', description: 'Consumer-authored label between two rule segments.' },
  ],
  capabilities: {
    horizontal: true,
    vertical: true,
    decorative: true,
    textContent: true,
    labelAlignment: true,
    menuPrimitive: false,
  },
  accessibility: [
    'A semantic Separator uses role="separator" and an explicit aria-orientation.',
    'decorative removes the separator role and orientation from the accessibility tree.',
    'Use decorative when surrounding structure already communicates the division.',
    'A horizontal label supplies the accessible name unless aria-label or aria-labelledby is provided.',
    'Keep labels non-interactive. start and end align with the reading direction.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
