import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const statisticMetadata = {
  name: 'Statistic',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description: 'A labelled metric with value, affixes, change, supporting text and loading.',
  import: "import { Statistic } from '@virgo-design/ui';",
  states: ['default', 'loading'],
  anatomy: [
    { name: 'Statistic.Root', description: 'Composition root.' },
    { name: 'Statistic.Label', description: 'Label slot.' },
    { name: 'Statistic.Value', description: 'Value slot.' },
    { name: 'Statistic.Trend', description: 'Trend slot.' },
    { name: 'Statistic.Description', description: 'Description slot.' },
  ],
  capabilities: { composition: true, loading: true },
  accessibility: [
    'Provide meaningful labels and localized descriptions. Decorative icons are hidden from assistive technology.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
