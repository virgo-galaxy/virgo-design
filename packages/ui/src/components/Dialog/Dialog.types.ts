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

export type DialogSize = 'sm' | 'md' | 'lg';

export type DialogProps = PrimitiveProps;
export type DialogRootProps = DialogProps;

export interface DialogTriggerProps extends PrimitiveTriggerProps {
  /** Virgo Button treatment when no custom render is supplied. @default 'outline' */
  variant?: ButtonVariant;
  /** Virgo Button size when no custom render is supplied. @default 'medium' */
  size?: ButtonSize;
}

export type DialogPortalProps = PrimitivePortalProps;
export type DialogOverlayProps = PrimitiveOverlayProps;

export interface DialogContentProps extends PrimitiveContentProps {
  /** Width and internal spacing of the dialog panel. @default 'md' */
  size?: DialogSize;
}

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;
export type DialogBodyProps = HTMLAttributes<HTMLDivElement>;
export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;
export type DialogTitleProps = PrimitiveTitleProps;
export type DialogDescriptionProps = PrimitiveDescriptionProps;

export interface DialogCloseProps extends PrimitiveCloseProps {
  /** Virgo Button treatment when no custom render is supplied. @default 'outline' */
  variant?: ButtonVariant;
  /** Virgo Button size when no custom render is supplied. @default 'medium' */
  size?: ButtonSize;
}
