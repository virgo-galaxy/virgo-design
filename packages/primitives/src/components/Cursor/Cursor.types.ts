import type { HTMLAttributes, ReactNode, RefObject } from 'react';

import type { OverlayPlacement } from '../../internal/overlay/positioning';

export interface CursorSnapshot {
  readonly x: number;
  readonly y: number;
  readonly active: boolean;
  readonly visible: boolean;
  readonly pointerType: string;
  readonly buttons: number;
}
export interface CursorFollowOptions {
  /** Let descendant Tooltips follow mouse hover. Keyboard focus stays element anchored. */
  tooltip?: boolean;
}
export interface CursorPointer {
  /** Stable external store. Subscribe in an effect for frame-coalesced updates without React renders. */
  getSnapshot: () => CursorSnapshot;
  subscribe: (listener: () => void) => () => void;
  /** Hide/reset all pointer feedback, for example before a client-side navigation. */
  reset: () => void;
  readonly follow: CursorFollowOptions;
  readonly scopeRef: RefObject<HTMLDivElement | null>;
}
export interface CursorProviderProps extends HTMLAttributes<HTMLDivElement> {
  cursor?: ReactNode;
  follow?: CursorFollowOptions;
  disabled?: boolean;
  /** Changing this value resets feedback; pass your router's location key for SPA navigation. */
  resetKey?: string | number;
  /** Pixel coordinate within the custom visual that coincides with the pointer. */
  hotspot?: { x: number; y: number };
  /** Class for the portalled, non-interactive visual layer. */
  visualClassName?: string;
}
export interface CursorFollowerProps extends HTMLAttributes<HTMLDivElement> {
  /** @default 'bottomLeft' */
  placement?: OverlayPlacement;
  /** Gap from the pointer, in pixels. @default 18 */
  offset?: number;
  /** Horizontal anchor adjustment, in pixels. @default 12 */
  offsetX?: number;
}
