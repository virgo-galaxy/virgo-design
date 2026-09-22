import type { HTMLAttributes, ReactNode } from 'react';

export interface CheckboxGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  /** Controlled selected values. */
  value?: readonly string[];

  /** Initial selected values for uncontrolled usage. */
  defaultValue?: readonly string[];

  /** Called whenever the selected values change. */
  onValueChange?: (value: string[]) => void;

  /** Shared native name forwarded to grouped checkboxes. */
  name?: string;

  /** Disables every checkbox in the group. */
  disabled?: boolean;

  children?: ReactNode;
}
