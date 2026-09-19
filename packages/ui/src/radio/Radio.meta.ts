import type { ComponentMetadata } from '../metadata/ComponentMetadata';

export const radioMetadata = {
  name: 'Radio',
  package: '@virgo-design/ui',
  category: 'Forms',
  description: 'Selects exactly one value from a group using standard circular radio controls.',
  import: "import { Radio, RadioGroup } from '@virgo-design/ui';",
  states: ['unchecked', 'checked', 'disabled'],
  anatomy: [
    {
      name: 'control',
      description: 'Native radio input that owns form, keyboard, focus, and checked semantics.',
    },
    {
      name: 'visualControl',
      description: 'Virgo circular radio frame and selected indicator.',
    },
    {
      name: 'label',
      description: 'Optional visible option label included in the radio hit target.',
    },
    {
      name: 'group',
      description:
        'Single-selection context that coordinates value, name, disabled state, and orientation.',
    },
  ],
  capabilities: {
    singleSelection: true,
    disabled: true,
    group: true,
    horizontal: true,
    vertical: true,
    visibleLabel: true,
  },
  accessibility: [
    'Uses native radio inputs and forwards native radio attributes and events.',
    'RadioGroup provides radiogroup semantics and a shared native name for grouped options.',
    'Horizontal and vertical groups expose aria-orientation.',
    'Visible labels wrap their native input so clicking the label selects the option.',
    'Supports aria-label or aria-labelledby when no visible label is provided.',
  ],
  examples: [
    {
      name: 'Horizontal radio group',
      code: '<RadioGroup defaultValue="pear"><Radio value="apple">Apple</Radio><Radio value="pear">Pear</Radio></RadioGroup>',
    },
    {
      name: 'Vertical radio group',
      code: '<RadioGroup orientation="vertical"><Radio value="small">Small</Radio><Radio value="large">Large</Radio></RadioGroup>',
    },
  ],
} as const satisfies ComponentMetadata;
