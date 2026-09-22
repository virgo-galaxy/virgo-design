import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, Ref } from 'react';

import type { OverlayPlacement } from '../../internal/overlay/positioning';

export type PopoverPlacement = OverlayPlacement;
export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Pointer activation. Both modes support keyboard and touch clicks. @default 'click' */
  trigger?: 'click' | 'hover';
  disabled?: boolean;
}
export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Supply a button which forwards the provided native props and ref. */
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}
export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Logical Start/End alignments follow the trigger's direction. @default 'bottomStart' */
  placement?: PopoverPlacement;
  /** Space between the trigger and panel, in pixels. @default 8 */
  offset?: number;
}
export type PopoverCloseProps = ButtonHTMLAttributes<HTMLButtonElement>;
