import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const resultMetadata = {
  name: 'Result',
  package: '@virgo-design/ui',
  category: 'Feedback',
  description:
    'Outcome and recovery states with composable icons, title, actions and extra content.',
  import: "import { Result } from '@virgo-design/ui';",
  states: ['success', 'error', 'warning', 'info', '403', '404', '500'],
  anatomy: [
    { name: 'Result.Root', description: 'Composition root.' },
    { name: 'Result.Icon', description: 'Icon slot.' },
    { name: 'Result.Title', description: 'Title slot.' },
    { name: 'Result.Description', description: 'Description slot.' },
    { name: 'Result.Actions', description: 'Actions slot.' },
    { name: 'Result.Extra', description: 'Extra slot.' },
  ],
  capabilities: { composition: true, loading: false },
  accessibility: [
    'Provide meaningful labels and localized descriptions. Decorative icons are hidden from assistive technology.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
