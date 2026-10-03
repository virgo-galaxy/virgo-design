import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import type { OverlayPlacement } from '../../internal/overlay/positioning';

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

export interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Preferred placement; flips and shifts at viewport boundaries. */
  placement?: OverlayPlacement;
  offset?: number;
}

export interface SelectOptionProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean | undefined;
}
