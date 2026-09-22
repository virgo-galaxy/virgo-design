import type { HTMLAttributes, ReactNode } from 'react';

export type RadioGroupOrientation = 'horizontal' | 'vertical';

export interface RadioGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  /** Controlled selected value. */
  value?: string;

  /** Initial selected value for uncontrolled usage. */
  defaultValue?: string;

  /** Called whenever the selected value changes. */
  onValueChange?: (value: string) => void;

  /** Shared native name forwarded to grouped radio inputs. */
  name?: string;

  /** Disables every radio in the group. */
  disabled?: boolean;

  /** Layout orientation for the group. */
  orientation?: RadioGroupOrientation;

  children?: ReactNode;
}
