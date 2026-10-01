import type { ColorPickerProps as PrimitiveProps } from '@virgo-design/primitives';
export interface ColorPickerProps extends PrimitiveProps {
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}
export type {
  ColorPickerAreaProps,
  ColorPickerChannelFieldProps,
  ColorPickerContentProps,
  ColorPickerHexFieldProps,
  ColorPickerHueProps,
  ColorPickerInputProps,
  ColorPickerPreviewProps,
  ColorPickerSwatchProps,
  ColorPickerTriggerProps,
} from '@virgo-design/primitives';
