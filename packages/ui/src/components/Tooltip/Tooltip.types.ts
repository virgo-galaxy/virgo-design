import type {
  TooltipContentProps as PrimitiveContentProps,
  TooltipProps as PrimitiveProps,
  TooltipTriggerProps as PrimitiveTriggerProps,
} from '@virgo-design/primitives';
import type { ReactNode } from 'react';

import type { ButtonSize, ButtonVariant } from '../Button';

export type { TooltipPlacement } from '@virgo-design/primitives';

export type TooltipProps = PrimitiveProps;
export type TooltipSize = 'small' | 'medium';
export type TooltipTone = 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
export interface TooltipProviderProps {
  children: ReactNode;
  /** Default content density for descendant tooltips, including built-in control hints. */
  size?: TooltipSize;
  /** Default arrow visibility for descendant tooltips. */
  arrow?: boolean;
}

export interface TooltipTriggerProps extends PrimitiveTriggerProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export interface TooltipContentProps extends PrimitiveContentProps {
  /** Content density, independent of Tooltip.Trigger's button size. @default 'medium' */
  size?: TooltipSize;
  /** @default true */
  arrow?: boolean;
  /** Theme-aware semantic color. @default 'default' */
  tone?: TooltipTone;
}
