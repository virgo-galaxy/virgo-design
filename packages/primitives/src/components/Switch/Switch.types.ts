import type { InputHTMLAttributes } from 'react';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Called when the checked state changes. */
  onCheckedChange?: (checked: boolean) => void;
}
