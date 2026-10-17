import type {
  PopoverCloseProps as PrimitiveCloseProps,
  PopoverContentProps as PrimitiveContentProps,
  PopoverProps as PrimitiveProps,
  PopoverTriggerProps as PrimitiveTriggerProps,
} from '@virgo-design/primitives';

import type { ButtonSize, ButtonVariant } from '../Button';

export type { PopoverPlacement } from '@virgo-design/primitives';

export type PopoverProps = PrimitiveProps;
export interface PopoverTriggerProps extends PrimitiveTriggerProps {
  /** Virgo Button treatment when no custom render is supplied. */
  variant?: ButtonVariant;
  /** Virgo Button size when no custom render is supplied. */
  size?: ButtonSize;
}

export interface PopoverContentProps extends PrimitiveContentProps {
  arrow?: boolean;
}

export type PopoverCloseProps = PrimitiveCloseProps;
