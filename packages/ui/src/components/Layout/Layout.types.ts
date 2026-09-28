import type {
  LayoutContentProps as PrimitiveLayoutContentProps,
  LayoutDirection,
  LayoutFooterProps as PrimitiveLayoutFooterProps,
  LayoutHeaderProps as PrimitiveLayoutHeaderProps,
  LayoutLaneProps as PrimitiveLayoutLaneProps,
  LayoutProps as PrimitiveLayoutProps,
  LayoutSidebarProps as PrimitiveLayoutSidebarProps,
  LayoutSidebarState,
  LayoutSidebarTriggerProps,
} from '@virgo-design/primitives';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

import type { SurfaceProps } from '../Surface';

export type { LayoutDirection };
export type { LayoutSidebarState, LayoutSidebarTriggerProps };

/** Surface owns all background and material rendering. */
export type LayoutSurface = Pick<
  SurfaceProps,
  'tone' | 'material' | 'background' | 'elevation' | 'radius' | 'border'
>;
export type LayoutLength = number | string;
export type LayoutSidebarSlot = ReactNode | ((state: LayoutSidebarState) => ReactNode);

export interface LayoutProps extends Omit<PrimitiveLayoutProps, 'className'> {
  /** Consumer class applied to the layout container. */
  className?: string;
  minHeight?: CSSProperties['minHeight'];
  surface?: LayoutSurface;
}

export interface LayoutHeaderProps extends Omit<PrimitiveLayoutHeaderProps, 'className'> {
  /** Consumer class applied to the header region. */
  className?: string;
  height?: LayoutLength;
  position?: 'static' | 'sticky' | 'fixed';
  top?: LayoutLength;
  /** Space between composed logo, content, and actions. */
  gap?: LayoutLength;
  /** Logical inline padding for the composed header. */
  paddingInline?: LayoutLength;
  /** Horizontal alignment of the optional content slot within its available space. @default 'start' */
  contentAlign?: 'start' | 'center' | 'end';
  logo?: ReactNode;
  actions?: ReactNode;
  surface?: LayoutSurface;
}

export interface LayoutLaneProps extends Omit<PrimitiveLayoutLaneProps, 'className'> {
  /** Consumer class applied to the lane boundary. */
  className?: string;
  /** Lane width, independent from the width of the content nested inside it. @default '100%' */
  width?: LayoutLength;
  /** Optional upper bound for the lane width. */
  maxWidth?: LayoutLength;
  /** Optional minimum block size for the lane. */
  minHeight?: CSSProperties['minHeight'];
  /** Shorthand inset between the lane boundary and in-flow children. */
  inset?: LayoutLength;
  /** Logical inline inset. Overrides inset on the inline axis. */
  insetInline?: LayoutLength;
  /** Logical block inset. Overrides inset on the block axis. */
  insetBlock?: LayoutLength;
  surface?: LayoutSurface;
}

export interface LayoutSidebarProps extends PrimitiveLayoutSidebarProps {
  /** Expanded width. Defaults to three sizing-80 tokens (240px). */
  width?: LayoutLength;
  /** Rail width. Use numeric 0 with an edge or external trigger to hide the region. */
  collapsedWidth?: LayoutLength;
  collapsible?: boolean;
  header?: LayoutSidebarSlot;
  footer?: LayoutSidebarSlot;
  /** Omit for the default button; null hides it. Custom triggers use SidebarTrigger. */
  trigger?: ReactNode;
  /** Place the collapse control in the footer or on the outer edge. @default 'footer' */
  triggerPlacement?: 'footer' | 'edge';
  /** Viewport width in px. Requests collapse on entry, restores the prior state on exit. */
  collapseBelow?: number;
  /** Allows pointer and keyboard resizing of the expanded sidebar width. */
  resizable?: boolean;
  /** Minimum resizable width in px. */
  minWidth?: number;
  /** Maximum resizable width in px. */
  maxWidth?: number;
  /** Called while the resizable width changes. */
  onWidthChange?: (width: number) => void;
  mode?: 'inline' | 'overlay' | 'floating';
  /** Distance from the containing region's edges in floating mode. */
  offset?: LayoutLength;
  side?: 'start' | 'end';
  surface?: LayoutSurface;
}

export interface LayoutContentProps extends Omit<PrimitiveLayoutContentProps, 'className'> {
  /** Consumer class applied to the main content region. */
  className?: string;
  padding?: 0 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64;
  scrollable?: boolean;
  surface?: LayoutSurface;
}

export interface LayoutFooterProps extends Omit<PrimitiveLayoutFooterProps, 'className'> {
  /** Consumer class applied to the footer region. */
  className?: string;
  surface?: LayoutSurface;
}

export interface LayoutFloatingProps extends HTMLAttributes<HTMLDivElement> {
  /** Logical corner within the nearest Content or Layout. @default 'bottom-end' */
  placement?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  /** Distance from both edges. Defaults to spacing-24. */
  offset?: LayoutLength;
}
