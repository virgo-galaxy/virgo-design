import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const emptyMetadata = {
  name: 'Empty',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description: 'Structures an application-provided empty-content message and optional action.',
  import: "import { Empty } from '@virgo-design/ui';",
  sizes: ['sm', 'md', 'lg'].map((name) => ({
    name,
    description: 'Coordinated spacing, icon, and typography scale.',
  })),
  states: ['basic', 'described', 'with-icon', 'with-action', 'compact'],
  anatomy: [
    { name: 'Empty.Root', description: 'Centered semantic section and size context.' },
    { name: 'Empty.Icon', description: 'Optional decorative icon slot.' },
    { name: 'Empty.Title', description: 'Empty-state heading rendered as h3.' },
    { name: 'Empty.Description', description: 'Supporting explanation paragraph.' },
    { name: 'Empty.Action', description: 'Optional consumer-owned action area.' },
  ],
  capabilities: {
    compoundApi: true,
    defaultCopy: false,
    defaultIcon: false,
    fetchLogic: false,
    retryLogic: false,
    errorState: false,
  },
  accessibility: [
    'Empty.Root renders a section and Empty.Title renders a real heading.',
    'Empty.Icon is decorative by default so the title remains the concise state announcement.',
    'Use aria-label or aria-labelledby on Empty.Root when it should be exposed as a named region.',
  ],
  examples: [
    { name: 'Basic', code: '<Empty><Empty.Title>No documents</Empty.Title></Empty>' },
    {
      name: 'With description',
      code: '<Empty><Empty.Title>No results</Empty.Title><Empty.Description>Try another query.</Empty.Description></Empty>',
    },
    {
      name: 'With action',
      code: '<Empty><Empty.Title>No documents</Empty.Title><Empty.Action><Button>Create</Button></Empty.Action></Empty>',
    },
  ],
} as const satisfies ComponentMetadata;
