import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, Ref } from 'react';

import type { OverlayPlacement } from '../../internal/overlay/positioning';

export type TooltipPlacement = OverlayPlacement;
export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  /** Hover delay in milliseconds; keyboard focus opens immediately. @default 100 */
  openDelay?: number;
  /** Dismiss on activation. Set false to keep dynamic feedback open while hover or keyboard focus remains. @default true */
  closeOnClick?: boolean;
  /** Smooth handoff between opted-in tooltips; ordinary tooltips keep their own delay and fade. @default false */
  smoothTransition?: boolean;
}
export interface TooltipTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Forward all supplied props and ref to a native button. */
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}
export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  /** @default 'top' */
  placement?: TooltipPlacement;
  /** @default 8 */
  offset?: number;
}
