import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const colorPickerMetadata = {
  name: 'ColorPicker',
  package: '@virgo-design/ui',
  category: 'Forms',
  description: 'Opaque sRGB color selection through native picking and reusable HEX swatches.',
  import: "import { ColorPicker } from '@virgo-design/ui';",
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
      name: 'ColorPicker',
      description: 'Opaque sRGB color selection through native picking and reusable HEX swatches.',
    },
    {
      name: 'ColorPicker.Input',
      description: 'Input composition part.',
    },
    {
      name: 'ColorPicker.Swatch',
      description: 'Swatch composition part.',
    },
    {
      name: 'ColorPicker.Preview',
      description: 'Preview composition part.',
    },
  ],
  capabilities: {
    nativeSemantics: true,
    controlledValue: true,
  },
  accessibility: ['Opaque sRGB color selection through native picking and reusable HEX swatches.'],
  examples: [],
} as const satisfies ComponentMetadata;
