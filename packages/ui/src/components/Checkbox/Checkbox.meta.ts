import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const checkboxMetadata = {
  name: 'Checkbox',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Toggles an independent boolean choice and supports grouped multi-selection and mixed selection states.',
  import: "import { Checkbox } from '@virgo-design/ui';",
  states: ['unchecked', 'checked', 'indeterminate', 'disabled'],
  anatomy: [
    {
      name: 'control',
      description: 'Native checkbox input that owns form, keyboard, focus, and checked semantics.',
    },
    {
      name: 'visualControl',
      description: 'Virgo checkbox frame that reflects unchecked, checked, and mixed states.',
    },
    {
      name: 'label',
      description: 'Optional visible label included in the checkbox hit target.',
    },
    {
      name: 'group',
      description: 'Optional multi-selection context that coordinates checkbox values and name.',
    },
  ],
  capabilities: {
    checked: true,
    indeterminate: true,
    disabled: true,
    group: true,
    visibleLabel: true,
  },
  accessibility: [
    'Uses a native checkbox input and forwards native checkbox attributes and events.',
    'The visible label wraps the native input so clicking the label toggles the checkbox.',
    'Supports aria-label or aria-labelledby when no visible label is provided.',
    'Exposes aria-checked="mixed" when indeterminate is true.',
    'Checkbox.Group preserves native checkbox form behavior with a shared name when provided.',
  ],
  examples: [
    {
      name: 'Basic checkbox',
      code: '<Checkbox defaultChecked>Sync changes</Checkbox>',
    },
    {
      name: 'Disabled checkbox',
      code: '<Checkbox disabled>Unavailable</Checkbox>',
    },
    {
      name: 'Checkbox group',
      code: '<Checkbox.Group defaultValue={["pear"]}><Checkbox value="apple">Apple</Checkbox><Checkbox value="pear">Pear</Checkbox></Checkbox.Group>',
    },
    {
      name: 'Indeterminate checkbox',
      code: '<Checkbox indeterminate>Check all</Checkbox>',
    },
  ],
} as const satisfies ComponentMetadata;
