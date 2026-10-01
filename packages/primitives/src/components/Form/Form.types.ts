import type { FormHTMLAttributes } from 'react';
export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /** Default disabled state for controls; individual fields may override it. */
  disabled?: boolean | undefined;
  /** Default read-only state for controls; does not manage form values. */
  readOnly?: boolean | undefined;
}
