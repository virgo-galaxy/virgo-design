import type {
  ToastActionProps as PrimitiveActionProps,
  ToastCloseProps as PrimitiveCloseProps,
  ToastDescriptionProps as PrimitiveDescriptionProps,
  ToastProps as PrimitiveProps,
  ToastProviderProps as PrimitiveProviderProps,
  ToastTitleProps as PrimitiveTitleProps,
  ToastViewportProps as PrimitiveViewportProps,
} from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export type ToastIntent = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ToastPlacement =
  'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';

export type ToastProviderProps = PrimitiveProviderProps;
export interface ToastProps extends PrimitiveProps {
  intent?: ToastIntent;
  /** Overrides the status icon. Use false to hide it. */
  icon?: ReactNode | false;
}
export type ToastRootProps = ToastProps;
export type ToastTitleProps = PrimitiveTitleProps;
export type ToastDescriptionProps = PrimitiveDescriptionProps;
export type ToastActionProps = PrimitiveActionProps;
export type ToastCloseProps = PrimitiveCloseProps;
export interface ToastViewportProps extends PrimitiveViewportProps {
  placement?: ToastPlacement;
}
