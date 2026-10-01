import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'react';
export interface ColorPickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  /** Controlled opaque sRGB color, formatted as #rrggbb. */
  value?: string | undefined;
  /** Initial color. @default '#000000' */
  defaultValue?: string | undefined;
  /** Called when the native color input or a swatch chooses a valid HEX color. */
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
