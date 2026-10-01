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
  /** Controlled opaque sRGB color, formatted as #rrggbb. */
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
  /** Opaque sRGB HEX color represented by this button. */
  value: string;
}
export type ColorPickerPreviewProps = HTMLAttributes<HTMLSpanElement>;

export type ColorPickerTriggerProps = PopoverTriggerProps;
export type ColorPickerContentProps = PopoverContentProps;
export interface ColorPickerHexFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue'
> {
  /** Display letter case; submitted colors remain canonical lowercase. @default 'lower' */
  letterCase?: 'lower' | 'upper';
}
export interface ColorPickerChannelFieldProps extends Omit<
  ColorPickerHexFieldProps,
  'letterCase' | 'min' | 'max' | 'step'
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
