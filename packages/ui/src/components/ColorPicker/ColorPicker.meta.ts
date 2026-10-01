import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const colorPickerMetadata = {
  name: 'ColorPicker',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Opaque sRGB color selection with native input, swatches and a composable HEX/RGB/HSV editing panel.',
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
      description:
        'Opaque sRGB color selection with native input, swatches and a composable HEX/RGB/HSV editing panel.',
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
    { name: 'ColorPicker.Trigger', description: 'Composable picker part.' },
    { name: 'ColorPicker.Content', description: 'Composable picker part.' },
    { name: 'ColorPicker.Area', description: 'Composable picker part.' },
    { name: 'ColorPicker.Hue', description: 'Composable picker part.' },
    { name: 'ColorPicker.HexField', description: 'Composable picker part.' },
    { name: 'ColorPicker.ChannelField', description: 'Composable picker part.' },
  ],
  capabilities: {
    nativeSemantics: true,
    controlledValue: true,
  },
  accessibility: [
    'Opaque sRGB color selection with native input, swatches and a composable HEX/RGB/HSV editing panel.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
