import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const textareaMetadata = {
  name: 'Textarea',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Accepts multiline text while sharing the Virgo Input family sizing, state, typography, and surface language.',
  import: "import { Textarea } from '@virgo-design/ui';",
  sizes: [
    { name: 'mini', description: '56px minimum height for compact multiline entry.' },
    { name: 'small', description: '64px minimum height for dense multiline entry.' },
    { name: 'medium', description: '80px minimum height and the default size.' },
    { name: 'large', description: '96px minimum height for spacious multiline entry.' },
  ],
  states: ['default', 'hover', 'focus', 'disabled', 'readOnly', 'invalid'],
  anatomy: [
    {
      name: 'control',
      description: 'Native textarea element that owns multiline text entry and form behavior.',
    },
  ],
  capabilities: {
    invalid: true,
    readOnly: true,
    nativeResize: true,
    autoGrow: false,
    characterCount: false,
  },
  accessibility: [
    'Renders a native textarea element and forwards native textarea attributes and events.',
    'Supports native rows and cols attributes for content sizing semantics.',
    'Sets aria-invalid when the invalid prop is true.',
    'Placeholder text is not a substitute for an accessible label.',
  ],
  examples: [
    {
      name: 'Basic textarea',
      code: '<Textarea aria-label="Description" placeholder="Describe the project" rows={4} />',
    },
    {
      name: 'Read-only textarea',
      code: '<Textarea readOnly aria-label="Summary" defaultValue="Virgo Design" />',
    },
    {
      name: 'Invalid textarea',
      code: '<Textarea invalid aria-label="Description" defaultValue="Needs revision" />',
    },
  ],
} as const satisfies ComponentMetadata;
