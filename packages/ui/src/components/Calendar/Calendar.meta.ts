import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const calendarMetadata = {
  name: 'Calendar',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'A localized month grid with independent selection and display, date constraints and keyboard navigation.',
  import: "import { Calendar } from '@virgo-design/ui';",
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
  states: ['default', 'focus', 'disabled', 'readOnly'],
  anatomy: [
    {
      name: 'Calendar',
      description:
        'A localized month grid with independent selection and display, date constraints and keyboard navigation.',
    },
  ],
  capabilities: {
    nativeSemantics: true,
    controlledValue: true,
  },
  accessibility: [
    'A localized month grid with independent selection and display, date constraints and keyboard navigation.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
