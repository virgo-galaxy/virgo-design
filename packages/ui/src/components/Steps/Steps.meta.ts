import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const stepsMetadata = {
  name: 'Steps',
  package: '@virgo-design/ui',
  category: 'Navigation',
  description:
    'An ordered sequence of stages with consumer-owned progress and optional action triggers.',
  import: "import { Steps } from '@virgo-design/ui';",
  states: ['default', 'focus'],
  anatomy: [
    { name: 'Steps.Root', description: 'Composition part.' },
    { name: 'Steps.Item', description: 'Composition part.' },
    { name: 'Steps.Trigger', description: 'Composition part.' },
    { name: 'Steps.Indicator', description: 'Composition part.' },
    { name: 'Steps.Title', description: 'Composition part.' },
    { name: 'Steps.Description', description: 'Composition part.' },
  ],
  capabilities: { nativeSemantics: true },
  accessibility: [
    'An ordered sequence of stages with consumer-owned progress and optional action triggers.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
