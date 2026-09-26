import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const cardMetadata = {
  name: 'Card',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description: 'Organizes a related group of content without adding interaction semantics.',
  import: "import { Card } from '@virgo-design/ui';",
  variants: [
    { name: 'default', description: 'Default semantic Surface without border or elevation.' },
    { name: 'outlined', description: 'Default semantic Surface with a subtle border.' },
    { name: 'elevated', description: 'Elevated semantic Surface with tokenized elevation.' },
  ],
  sizes: ['sm', 'md', 'lg'].map((name) => ({
    name,
    description: 'Coordinated structural padding, gap, and title typography.',
  })),
  states: ['default', 'outlined', 'elevated'],
  anatomy: [
    { name: 'Card.Root', description: 'Surface-backed structural content container.' },
    { name: 'Card.Header', description: 'Groups title and supporting description.' },
    { name: 'Card.Title', description: 'Visual title with a consumer-selected heading element.' },
    { name: 'Card.Description', description: 'Supporting description paragraph.' },
    { name: 'Card.Body', description: 'Primary content region.' },
    { name: 'Card.Footer', description: 'Trailing content and action composition region.' },
  ],
  capabilities: {
    compoundApi: true,
    surfaceIntegration: true,
    arbitraryChildren: true,
    headingSelection: true,
    clickable: false,
    selectable: false,
    imageSystem: false,
  },
  accessibility: [
    'Card.Root adds no role, landmark, tab stop, or interaction semantics.',
    'Card.Title defaults to a neutral div; choose an h1–h6 with the as prop when it is a document heading.',
    'Interactive controls remain explicit children, usually composed inside Card.Footer.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
