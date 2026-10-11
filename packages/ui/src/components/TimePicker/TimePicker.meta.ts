import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const timePickerMetadata = {
  name: 'TimePicker',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Local time entry with native editing and validation, plus a themed hour, minute and second popover.',
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
        'Local time entry with native editing and validation, plus a themed hour, minute and second popover.',
    },
  ],
  capabilities: {
    nativeSemantics: true,
    controlledValue: true,
  },
  accessibility: [
    'Local time entry with native editing and validation, plus a themed hour, minute and second popover.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
