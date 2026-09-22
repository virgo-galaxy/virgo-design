import type {
  DropdownContentProps as PrimitiveContentProps,
  DropdownItemProps as PrimitiveItemProps,
  DropdownProps as PrimitiveProps,
  DropdownTriggerProps as PrimitiveTriggerProps,
} from '@virgo-design/primitives';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { ButtonSize, ButtonVariant } from '../Button';

export type { DropdownPlacement } from '@virgo-design/primitives';
export interface DropdownProps extends PrimitiveProps {
  size?: ButtonSize;
}
export interface DropdownTriggerProps extends Omit<PrimitiveTriggerProps, 'render'> {
  variant?: ButtonVariant;
  danger?: boolean;
  /** Decorative trailing icon; false hides it. Defaults to ChevronDownIcon. */
  indicator?: ReactNode;
}
export interface DropdownContentProps extends PrimitiveContentProps {
  arrow?: boolean;
}
export interface DropdownItemProps extends PrimitiveItemProps {
  icon?: ReactNode;
  danger?: boolean;
}
export interface DropdownButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label for the separate menu button. */
  menuLabel: string;
  menuIcon?: ReactNode;
  variant?: ButtonVariant;
  danger?: boolean;
}
