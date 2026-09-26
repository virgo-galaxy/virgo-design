import type {
  TooltipContentProps as PrimitiveContentProps,
  TooltipProps as PrimitiveProps,
  TooltipTriggerProps as PrimitiveTriggerProps,
} from '@virgo-design/primitives';

import type { ButtonSize, ButtonVariant } from '../Button';

export type { TooltipPlacement } from '@virgo-design/primitives';
export type TooltipProps = PrimitiveProps;
export type TooltipSize = 'small' | 'medium';
export type TooltipTone = 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
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
