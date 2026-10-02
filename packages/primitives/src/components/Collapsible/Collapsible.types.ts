import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, Ref } from 'react';

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled open state. */
  open?: boolean;

  /** Initial open state for uncontrolled usage. @default false */
  defaultOpen?: boolean;

  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
}

export type CollapsibleRootProps = CollapsibleProps;

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render a custom button that forwards all supplied props and its ref. */
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Keep closed content rendered for consumer animations; closed content remains inert and hidden from assistive technology. @default false */
  keepMounted?: boolean;
}
