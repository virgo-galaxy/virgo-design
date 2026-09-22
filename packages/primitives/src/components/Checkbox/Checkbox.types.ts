import type { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Displays the native checkbox in a mixed state.
   *
   * @default false
   */
  indeterminate?: boolean;
}
