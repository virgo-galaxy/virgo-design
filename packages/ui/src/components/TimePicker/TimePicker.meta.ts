import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const timePickerMetadata = {
  name: 'TimePicker',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Local time entry with native segmented editing, precision and browser constraint validation.',
  import: "import { TimePicker } from '@virgo-design/ui';",
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
      name: 'TimePicker',
      description:
        'Local time entry with native segmented editing, precision and browser constraint validation.',
    },
  ],
  capabilities: {
    nativeSemantics: true,
    controlledValue: true,
  },
  accessibility: [
    'Local time entry with native segmented editing, precision and browser constraint validation.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
