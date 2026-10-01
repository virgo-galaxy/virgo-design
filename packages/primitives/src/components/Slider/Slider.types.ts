import type { InputHTMLAttributes } from 'react';
export interface SliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue' | 'size'
> {
  /** Controlled numeric value, constrained by min/max/step. */
  value?: number | undefined;
  /** Initial value. Defaults to the midpoint of min and max. */
  defaultValue?: number | undefined;
  /** Called for native pointer and keyboard value changes. */
  onValueChange?: ((value: number) => void) | undefined;
}
