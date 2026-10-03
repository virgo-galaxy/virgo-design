import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeIntent = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeAnimation = 'none' | 'breathe';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Numeric or short text content. */
  count?: number | string;
  /** Maximum displayed numeric count. @default 99 */
  max?: number;
  /** Shows the count when it is zero. @default false */
  showZero?: boolean;
  /** Shows a status dot instead of count content. */
  dot?: boolean;
  /** Optional dot animation. Counts stay static; respects prefers-reduced-motion. @default 'none' */
  animation?: BadgeAnimation;
  /** Semantic color intent. @default 'default' */
  intent?: BadgeIntent;
  /** Optional host element. Without children, Badge renders inline. */
  children?: ReactNode;
}
