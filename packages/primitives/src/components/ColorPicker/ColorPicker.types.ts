import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'react';

import type { PopoverContentProps, PopoverTriggerProps } from '../Popover';
export interface ColorPickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  /** Controlled panel open state. */
  open?: boolean | undefined;
  /** Initial panel open state. @default false */
  defaultOpen?: boolean | undefined;
  /** Called when the panel opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined;
  /** Controlled sRGB color, formatted as #rrggbb or #rrggbbaa. */
  value?: string | undefined;
  /** Initial color. @default '#000000' */
  defaultValue?: string | undefined;
  /** Called when any picker part chooses a valid HEX color. */
  onValueChange?: ((value: string) => void) | undefined;
  /** Native form name for the selected HEX color. */
  name?: string | undefined;
  /** Disable the picker and swatches. */
  disabled?: boolean | undefined;
  /** Prevent color edits while retaining the current form value. */
  readOnly?: boolean | undefined;
}
export type ColorPickerInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue'
>;
export interface ColorPickerSwatchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** sRGB HEX color represented by this button, with optional alpha. */
  value: string;
}
export type ColorPickerPreviewProps = HTMLAttributes<HTMLSpanElement>;
export interface ColorPickerValueProps extends HTMLAttributes<HTMLSpanElement> {
  /** Display letter case. @default 'upper' */
  letterCase?: 'lower' | 'upper';
}

export type ColorPickerTriggerProps = PopoverTriggerProps;
export type ColorPickerContentProps = PopoverContentProps;
export interface ColorPickerHexFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue'
> {
  /** Display letter case; submitted colors remain canonical lowercase. @default 'lower' */
  letterCase?: 'lower' | 'upper';
  /** Include the alpha byte in the text; false preserves it during RGB edits. @default true */
  includeAlpha?: boolean;
}
export interface ColorPickerChannelFieldProps extends Omit<
  ColorPickerHexFieldProps,
  'letterCase' | 'includeAlpha' | 'min' | 'max' | 'step'
> {
  /** sRGB channel edited as an integer from 0 to 255. */
  channel: 'r' | 'g' | 'b';
}
export interface ColorPickerAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the independently keyboard-operable saturation slider. */
  saturationLabel: string;
  /** Accessible name for the independently keyboard-operable brightness slider. */
  brightnessLabel: string;
}
export type ColorPickerHueProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue' | 'min' | 'max' | 'step' | 'readOnly'
>;
export type ColorPickerOpacityProps = ColorPickerHueProps;
export type ColorPickerAlphaFieldProps = Omit<ColorPickerChannelFieldProps, 'channel'>;
