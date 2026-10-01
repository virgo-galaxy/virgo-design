import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const sliderMetadata = {
  name: 'Slider',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'A native numeric slider with constrained values, keyboard editing and shared field semantics.',
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
  ],
  capabilities: {
    nativeSemantics: true,
    controlledValue: true,
  },
  accessibility: [
    'A native numeric slider with constrained values, keyboard editing and shared field semantics.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
