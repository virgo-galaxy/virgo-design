import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const timelineMetadata = {
  name: 'Timeline',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description:
    'An ordered sequence of events with timestamps, descriptions and progress presentation.',
  import: "import { Timeline } from '@virgo-design/ui';",
  sizes: [
    {
      name: 'small',
      description: 'Compact presentation.',
    },
    {
      name: 'medium',
      description: 'Default presentation.',
    },
    {
      name: 'large',
      description: 'Spacious presentation.',
    },
  ],
  states: ['pending', 'active', 'complete'],
  anatomy: [
    {
      name: 'Timeline',
      description:
        'An ordered sequence of events with timestamps, descriptions and progress presentation.',
    },
    {
      name: 'Timeline.Item',
      description: 'Item composition part.',
    },
    {
      name: 'Timeline.Title',
      description: 'Title composition part.',
    },
    {
      name: 'Timeline.Description',
      description: 'Description composition part.',
    },
    {
      name: 'Timeline.Time',
      description: 'Time composition part.',
    },
    {
      name: 'Timeline.Indicator',
      description: 'Indicator composition part.',
    },
  ],
  capabilities: {
    nativeSemantics: true,
    controlledValue: false,
  },
  accessibility: [
    'An ordered sequence of events with timestamps, descriptions and progress presentation.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
