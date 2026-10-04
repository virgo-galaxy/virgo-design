import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const datePickerMetadata = {
  name: 'DatePicker',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Single-date entry or a composed two-month interval picker with shared input and calendar state.',
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
      description:
        'Single-date entry or a composed two-month interval picker with shared input and calendar state.',
    },
    { name: 'DatePicker.Range', description: 'Controlled or uncontrolled interval root.' },
    { name: 'DatePicker.RangeInput', description: 'Editable start or end date.' },
    {
      name: 'DatePicker.RangeCalendar',
      description: 'Two adjacent months with interval selection.',
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
  accessibility: [
    'Single-date entry or a composed two-month interval picker with shared input and calendar state.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
