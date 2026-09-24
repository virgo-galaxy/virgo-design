import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Prevent interaction with content outside the dialog while open. @default true */
  modal?: boolean;
}

export type DialogRootProps = DialogProps;

export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render a custom button that forwards all supplied props and its ref. */
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}

export interface DialogPortalProps {
  children?: ReactNode;
}

export type DialogOverlayProps = HTMLAttributes<HTMLDivElement>;

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerEvent) => void;
}

export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type DialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render a custom button that forwards all supplied props and its ref. */
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}
