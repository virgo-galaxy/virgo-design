import type {
  ColorPickerContentProps,
  ColorPickerProps as PrimitiveProps,
  ColorPickerTriggerProps as PrimitiveTriggerProps,
} from '@virgo-design/primitives';
export interface ColorPickerProps extends PrimitiveProps {
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}
export interface ColorPickerTriggerProps extends PrimitiveTriggerProps {
  /** Built-in compact swatch or fixed-width swatch-and-value trigger. @default 'swatch' */
  variant?: 'swatch' | 'value' | undefined;
  /** Optional display label, such as currentColor, instead of the selected HEX value. */
  valueLabel?: string | undefined;
}
export interface ColorPickerPanelProps extends ColorPickerContentProps {
  /** Density of the built-in panel controls. @default 'small' */
  size?: 'small' | 'medium' | 'large' | undefined;
  /** Built-in simple HEX editor or full HEX/RGB editor. @default 'full' */
  variant?: 'simple' | 'full';
  /** Show opacity controls. Defaults to true for full panels and false for simple panels. */
  alpha?: boolean;
  /** Localized accessible names for the built-in panel controls. */
  labels: {
    saturation: string;
    brightness: string;
    hue: string;
    opacity: string;
    format: string;
    hex: string;
    red: string;
    green: string;
    blue: string;
  };
}
export type {
  ColorPickerAlphaFieldProps,
  ColorPickerAreaProps,
  ColorPickerChannelFieldProps,
  ColorPickerContentProps,
  ColorPickerHexFieldProps,
  ColorPickerHueProps,
  ColorPickerInputProps,
  ColorPickerOpacityProps,
  ColorPickerPreviewProps,
  ColorPickerSwatchProps,
  ColorPickerValueProps,
} from '@virgo-design/primitives';
