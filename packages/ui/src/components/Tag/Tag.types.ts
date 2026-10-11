import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';

export type TagIntent = 'neutral' | 'brand' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
export type TagVariant = 'soft' | 'solid' | 'outline';
export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onClose'> {
  /** Semantic color treatment. @default 'neutral' */
  intent?: TagIntent;
  /** Surface treatment. @default 'soft' */
  variant?: TagVariant;
  /** Compact visual size. @default 'md' */
  size?: TagSize;
  /** Decorative leading icon. */
  icon?: ReactNode;
  /** Shows a keyboard-accessible close control. */
  closable?: boolean;
  /** Disables the close control when this tag is interactive. */
  disabled?: boolean;
  /** Accessible name for the close control. @default 'Remove tag' */
  closeLabel?: string;
  /** Notifies the owner; the Tag does not remove itself. */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
}
