import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const comboboxMetadata = {
  name: 'Combobox',
  package: '@virgo-design/ui',
  category: 'Forms',
  description: 'Combines editable input with a filtered, positioned single-selection listbox.',
  import: "import { Combobox } from '@virgo-design/ui';",
  sizes: [
    { name: 'small', description: 'Compact presentation.' },
    { name: 'medium', description: 'Default presentation.' },
    { name: 'large', description: 'Spacious presentation.' },
  ],
  states: ['default', 'focus', 'open', 'selected', 'disabled', 'readOnly', 'invalid'],
  anatomy: [
    {
      name: 'Combobox',
      description: 'Combobox composition part.',
    },
    {
      name: 'Combobox.Input',
      description: 'Combobox.Input composition part.',
    },
    {
      name: 'Combobox.Content',
      description: 'Combobox.Content composition part.',
    },
    {
      name: 'Combobox.Option',
      description: 'Combobox.Option composition part.',
    },
    {
      name: 'Combobox.Empty',
      description: 'Combobox.Empty composition part.',
    },
    {
      name: 'Combobox.Group',
      description: 'Combobox.Group composition part.',
    },
    {
      name: 'Combobox.Clear',
      description: 'Combobox.Clear composition part.',
    },
  ],
  capabilities: {
    controlledInput: true,
    controlledValue: true,
    controlledOpen: true,
    filtering: true,
    portal: true,
    multiSelect: false,
  },
  accessibility: [
    'Input keeps DOM focus and points aria-activedescendant to an enabled visible option.',
    'Composition input retains Enter and arrow keys for the IME.',
    'Home/End retain native input editing; Tab closes without committing.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
