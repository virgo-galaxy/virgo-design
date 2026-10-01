import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const datePickerMetadata = {
  name: 'DatePicker',
  package: '@virgo-design/ui',
  category: 'Forms',
  description: 'Native date entry and a composed calendar popup sharing one civil date value.',
  import: "import { DatePicker } from '@virgo-design/ui';",
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
      name: 'DatePicker',
      description: 'Native date entry and a composed calendar popup sharing one civil date value.',
    },
    {
      name: 'DatePicker.Input',
      description: 'Input composition part.',
    },
    {
      name: 'DatePicker.Trigger',
      description: 'Trigger composition part.',
    },
    {
      name: 'DatePicker.Content',
      description: 'Content composition part.',
    },
    {
      name: 'DatePicker.Calendar',
      description: 'Calendar composition part.',
    },
  ],
  capabilities: {
    nativeSemantics: true,
    controlledValue: true,
  },
  accessibility: ['Native date entry and a composed calendar popup sharing one civil date value.'],
  examples: [],
} as const satisfies ComponentMetadata;
