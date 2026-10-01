import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface SelectProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'id' | 'onChange'
> {
  children: ReactNode;
  /** Identifier applied to the interactive trigger. */
  id?: string | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onValueChange?: ((value: string) => void) | undefined;
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  disabled?: boolean | undefined;
  /** Prevents opening or changing selection while remaining focusable. */
  readOnly?: boolean | undefined;
  name?: string | undefined;
}

export type SelectTriggerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'>;

export type SelectContentProps = HTMLAttributes<HTMLDivElement>;

export interface SelectOptionProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean | undefined;
}
