import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const statisticMetadata = {
  name: 'Statistic',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description:
    'A labelled metric with optional decelerating numeric animation, affixes, change, supporting text and loading.',
  import: "import { Statistic } from '@virgo-design/ui';",
  states: ['default', 'loading', 'animated'],
  anatomy: [
    { name: 'Statistic.Root', description: 'Composition root.' },
    { name: 'Statistic.Label', description: 'Label slot.' },
    { name: 'Statistic.Value', description: 'Value slot.' },
    { name: 'Statistic.Trend', description: 'Trend slot.' },
    { name: 'Statistic.Description', description: 'Description slot.' },
  ],
  capabilities: { composition: true, loading: true, animation: true },
  accessibility: [
    'Provide meaningful labels and localized descriptions. Decorative icons are hidden from assistive technology.',
    'Numeric animation respects reduced motion. Assistive technology receives the final value instead of every animation frame.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
