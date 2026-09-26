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
  ],
  states: ['semantic', 'decorative'],
  anatomy: [{ name: 'Separator', description: 'Single token-colored layout rule.' }],
  capabilities: {
    horizontal: true,
    vertical: true,
    decorative: true,
    textContent: false,
    menuPrimitive: false,
  },
  accessibility: [
    'A semantic Separator uses role="separator" and an explicit aria-orientation.',
    'decorative removes the separator role and orientation from the accessibility tree.',
    'Use decorative when surrounding structure already communicates the division.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
