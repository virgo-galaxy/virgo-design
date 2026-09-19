import type { ComponentMetadata } from '../metadata/ComponentMetadata';

export const inputMetadata = {
  name: 'Input',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Accepts a single line of text while preserving Virgo sizing, states, icons, and native input semantics.',
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
      name: 'leadingIcon',
      description: 'Optional decorative icon before the native input control.',
    },
    {
      name: 'control',
      description: 'Native input element that owns text-entry semantics and form behavior.',
    },
    {
      name: 'trailingIcon',
      description: 'Optional decorative icon after the native input control.',
    },
  ],
  capabilities: {
    leadingIcon: true,
    trailingIcon: true,
    invalid: true,
    readOnly: true,
    clearable: false,
    passwordReveal: false,
    loading: false,
  },
  accessibility: [
    'Renders a native input element and forwards native input attributes and events.',
    'Defaults to type="text" when no explicit native input type is provided.',
    'Treats leading and trailing icons as decorative and hides them from the accessibility tree.',
    'Sets aria-invalid when the invalid prop is true.',
    'Placeholder text is not a substitute for an accessible label.',
  ],
  examples: [
    {
      name: 'Basic input',
      code: '<Input aria-label="Project name" placeholder="Untitled project" />',
    },
    {
      name: 'Leading icon',
      code: '<Input aria-label="Search" leadingIcon={<SearchIcon />} placeholder="Search components" />',
    },
    {
      name: 'Invalid input',
      code: '<Input invalid aria-label="Project slug" defaultValue="virgo design" />',
    },
  ],
} as const satisfies ComponentMetadata;
