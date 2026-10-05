import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const sliderMetadata = {
  name: 'Slider',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Single-value and ordered multi-thumb sliders with constrained values, keyboard editing and shared field semantics.',
  import: "import { Slider } from '@virgo-design/ui';",
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
      name: 'Slider',
      description:
        'A native numeric slider with constrained values, keyboard editing and shared field semantics.',
    },
    {
      name: 'Slider.Range',
      description: 'An ordered range with two or more independently labeled thumbs.',
    },
    { name: 'track', description: 'Pointer target and numeric domain.' },
    { name: 'range', description: 'Filled segment between the first and last thumb.' },
    { name: 'thumb', description: 'Keyboard-editable value bounded by adjacent thumbs.' },
  ],
  capabilities: {
    nativeSemantics: true,
    controlledValue: true,
    multipleThumbs: true,
    range: true,
  },
  accessibility: [
    'A native numeric slider with constrained values, keyboard editing and shared field semantics.',
    'Range thumbs have stable tab order, individual names and dynamic ARIA bounds; arrow keys, Page Up/Down, Home and End edit each value.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
