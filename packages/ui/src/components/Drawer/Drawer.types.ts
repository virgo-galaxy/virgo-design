import type {
  DialogCloseProps as PrimitiveCloseProps,
  DialogContentProps as PrimitiveContentProps,
  DialogDescriptionProps as PrimitiveDescriptionProps,
  DialogOverlayProps as PrimitiveOverlayProps,
  DialogPortalProps as PrimitivePortalProps,
  DialogProps as PrimitiveProps,
  DialogTitleProps as PrimitiveTitleProps,
  DialogTriggerProps as PrimitiveTriggerProps,
} from '@virgo-design/primitives';
import type { HTMLAttributes } from 'react';

import type { ButtonSize, ButtonVariant } from '../Button';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg';

export type DrawerProps = PrimitiveProps;
export type DrawerRootProps = DrawerProps;

export interface DrawerTriggerProps extends PrimitiveTriggerProps {
  /** Virgo Button treatment when no custom render is supplied. @default 'outline' */
  variant?: ButtonVariant;
  /** Virgo Button size when no custom render is supplied. @default 'medium' */
  size?: ButtonSize;
}

export type DrawerPortalProps = PrimitivePortalProps;
export type DrawerOverlayProps = PrimitiveOverlayProps;

export interface DrawerContentProps extends PrimitiveContentProps {
  /** Screen edge from which the panel enters. @default 'right' */
  placement?: DrawerPlacement;
  /** Width for left/right drawers or height for top/bottom drawers. @default 'md' */
  size?: DrawerSize;
}

export type DrawerHeaderProps = HTMLAttributes<HTMLDivElement>;
export type DrawerBodyProps = HTMLAttributes<HTMLDivElement>;
export type DrawerFooterProps = HTMLAttributes<HTMLDivElement>;
export type DrawerTitleProps = PrimitiveTitleProps;
export type DrawerDescriptionProps = PrimitiveDescriptionProps;

export interface DrawerCloseProps extends PrimitiveCloseProps {
  /** Virgo Button treatment when visible text is supplied. @default 'outline' */
  variant?: ButtonVariant;
  /** Virgo Button size. @default 'small' for the icon control, otherwise 'medium' */
  size?: ButtonSize;
}
