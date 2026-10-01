import type { InputHTMLAttributes } from 'react';
export interface TimePickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue' | 'size'
> {
  /** Controlled local wall-clock time in HH:mm or HH:mm:ss form. No timezone conversion. */
  value?: string | undefined;
  /** Initial local time; an empty string represents no value. */
  defaultValue?: string | undefined;
  /** Called when a native time edit changes the value, including clear. */
  onValueChange?: ((value: string) => void) | undefined;
}
