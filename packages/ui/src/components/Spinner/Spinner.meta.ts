import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const spinnerMetadata = {
  name: 'Spinner',
  package: '@virgo-design/ui',
  category: 'Feedback',
  description: 'Indicates indeterminate work without managing asynchronous state.',
  import: "import { Spinner } from '@virgo-design/ui';",
  sizes: ['sm', 'md', 'lg'].map((name) => ({
    name,
    description: 'Token-based spinner diameter.',
  })),
  intents: [
    { name: 'current', description: 'Inherits currentColor for composition.' },
    { name: 'neutral', description: 'Uses the secondary semantic text color.' },
    { name: 'brand', description: 'Uses the primary semantic brand color.' },
  ],
  states: ['decorative', 'labeled'],
  anatomy: [{ name: 'Spinner', description: 'Single indeterminate circular indicator.' }],
  capabilities: {
    indeterminate: true,
    determinate: false,
    currentColor: true,
    reducedMotion: true,
    asyncStateManagement: false,
  },
  accessibility: [
    'An unlabeled Spinner is visual-only and receives aria-hidden="true".',
    'Provide aria-label when Spinner independently communicates a loading status.',
    'Rotation uses motion tokens and stops under prefers-reduced-motion.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
