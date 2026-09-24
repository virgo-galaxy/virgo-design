import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';

export interface ToastProviderProps {
  children?: ReactNode;
  /** Keyboard shortcut that moves focus into the toast viewport. @default ['F8'] */
  hotkey?: readonly string[];
}

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Auto-dismiss delay in milliseconds. Use 0 to keep the toast open. @default 5000 */
  duration?: number;
  /** Announcement priority. @default 'polite' */
  priority?: 'polite' | 'assertive';
}

export type ToastRootProps = ToastProps;
export type ToastTitleProps = HTMLAttributes<HTMLDivElement>;
export type ToastDescriptionProps = HTMLAttributes<HTMLDivElement>;

export interface ToastActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render a custom button while forwarding the supplied props and ref. */
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}

export interface ToastCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render a custom button while forwarding the supplied props and ref. */
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}

export type ToastViewportProps = HTMLAttributes<HTMLDivElement>;
