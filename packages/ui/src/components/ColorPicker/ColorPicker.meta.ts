import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const colorPickerMetadata = {
  name: 'ColorPicker',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'sRGB color selection with swatch or value triggers, HEX/RGB editing, hue and optional opacity.',
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
        'sRGB color selection with swatch or value triggers, HEX/RGB editing, hue and optional opacity.',
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
    { name: 'ColorPicker.Trigger', description: 'Compact swatch or swatch-and-value button.' },
    {
      name: 'ColorPicker.Panel',
      description: 'Built-in color, format and optional opacity controls.',
    },
    { name: 'ColorPicker.Value', description: 'Selected HEX readout.' },
    { name: 'ColorPicker.Opacity', description: 'Keyboard-operable opacity slider.' },
    { name: 'ColorPicker.AlphaField', description: 'Opacity percentage editor.' },
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
    'sRGB color selection with swatch or value triggers, HEX/RGB editing, hue and optional opacity.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
