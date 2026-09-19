import type {
  CheckboxGroupProps as PrimitiveCheckboxGroupProps,
  CheckboxProps as PrimitiveCheckboxProps,
} from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export interface CheckboxProps extends Omit<PrimitiveCheckboxProps, 'className'> {
  /** Optional visible label rendered beside the checkbox control. */
  children?: ReactNode;

  /** Consumer class applied to the Checkbox root label. */
  className?: string;
}

export type CheckboxGroupProps = PrimitiveCheckboxGroupProps;
