import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const formMetadata = {
  name: 'Form',
  package: '@virgo-design/ui',
  category: 'Forms',
  description: 'Composes native form semantics and field layout without managing business data.',
  import: "import { Form } from '@virgo-design/ui';",
  sizes: [
    { name: 'small', description: 'Compact presentation.' },
    { name: 'medium', description: 'Default presentation.' },
    { name: 'large', description: 'Spacious presentation.' },
  ],
  states: ['default', 'disabled', 'readOnly'],
  anatomy: [
    {
      name: 'Form',
      description: 'Form composition part.',
    },
  ],
  capabilities: {
    nativeSubmit: true,
    stateManagement: false,
    validation: false,
  },
  accessibility: ['Uses a native form; applications own submit handling and validation.'],
  examples: [],
} as const satisfies ComponentMetadata;
