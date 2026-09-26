import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const inputMetadata = {
  name: 'Input',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Accepts a single line of text with optional adornments, clearing, password reveal, and native input semantics.',
  import: "import { Input } from '@virgo-design/ui';",
  sizes: [
    { name: 'mini', description: '24px height for compact interfaces.' },
    { name: 'small', description: '28px height for dense interfaces.' },
    { name: 'medium', description: '36px height and the default size.' },
    { name: 'large', description: '44px height for spacious input surfaces.' },
  ],
  states: ['default', 'hover', 'focus', 'disabled', 'readOnly', 'invalid'],
  anatomy: [
    {
      name: 'root',
      description: 'Visual input frame that owns border, surface, spacing, and state.',
    },
    {
      name: 'prefix',
      description: 'Optional decorative content before the native input control.',
    },
    {
      name: 'control',
      description: 'Native input element that owns text-entry semantics and form behavior.',
    },
    {
      name: 'suffix',
      description: 'Optional decorative content after the native input control.',
    },
    {
      name: 'action',
      description: 'Optional clear or password-visibility action after the control.',
    },
  ],
  capabilities: {
    prefix: true,
    suffix: true,
    leadingIcon: true,
    trailingIcon: true,
    invalid: true,
    readOnly: true,
    clearable: true,
    passwordReveal: true,
    loading: false,
  },
  accessibility: [
    'Renders a native input element and forwards native input attributes and events.',
    'Defaults to type="text" when no explicit native input type is provided.',
    'Treats prefix and suffix content as decorative and hides them from the accessibility tree.',
    'Clear and password-visibility actions are keyboard accessible and restore focus to the input.',
    'Sets aria-invalid when the invalid prop is true.',
    'Placeholder text is not a substitute for an accessible label.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
