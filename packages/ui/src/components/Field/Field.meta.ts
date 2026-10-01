import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const fieldMetadata = {
  name: 'Field',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Associates a single control with a label, supporting descriptions and consumer-owned messages.',
  import: "import { Field } from '@virgo-design/ui';",
  states: ['default', 'focus', 'disabled', 'invalid'],
  anatomy: [
    {
      name: 'Field',
      description: 'Field composition part.',
    },
    {
      name: 'Field.Label',
      description: 'Field.Label composition part.',
    },
    {
      name: 'Field.Control',
      description: 'Field.Control composition part.',
    },
    {
      name: 'Field.Description',
      description: 'Field.Description composition part.',
    },
    {
      name: 'Field.Message',
      description: 'Field.Message composition part.',
    },
  ],
  capabilities: {
    association: true,
    stateInheritance: true,
    validation: false,
  },
  accessibility: [
    'Merges description IDs with existing aria-describedby.',
    'Required, invalid, disabled and read-only states flow to Virgo controls.',
    'Use separate fields for single controls and native fieldset/legend for groups.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
