import type { ColorPickerProps as PrimitiveProps } from '@virgo-design/primitives';
export interface ColorPickerProps extends PrimitiveProps {
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}
export type {
  ColorPickerInputProps,
  ColorPickerPreviewProps,
  ColorPickerSwatchProps,
} from '@virgo-design/primitives';
