import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';

export type LayoutDirection = 'vertical' | 'horizontal';

export interface LayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Structural regions rendered in document order. */
  children: ReactNode;

  /** Direction in which the direct child regions are arranged. */
  direction?: LayoutDirection;
}

export type LayoutHeaderProps = HTMLAttributes<HTMLElement>;

export interface LayoutLaneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Structural children that live within this spatial lane. */
  children: ReactNode;

  /** Direction in which direct lane children are arranged. */
  direction?: LayoutDirection;
}

/** Distinct expanded, icon-rail and fully hidden Sidebar states. */
export type LayoutSidebarDisplayState = 'expanded' | 'collapsed' | 'hidden';

export interface LayoutSidebarState {
  /** Current resolved display state. */
  state: LayoutSidebarDisplayState;
  /** Requests a display-state change. */
  setState: (state: LayoutSidebarDisplayState) => void;
  collapsed: boolean;
}

/** Shared state and external trigger scope for one Sidebar. Provider state takes precedence over nested Sidebar state props. */
export interface LayoutSidebarProviderProps {
  /** ID of the single Sidebar controlled by this provider. Generated when omitted. */
  id?: string;
  /** Controlled display state shared by the Sidebar and triggers. */
  state?: LayoutSidebarDisplayState;
  /** Initial uncontrolled display state. @default 'expanded' */
  defaultState?: LayoutSidebarDisplayState;
  /** Called when a trigger, resize snap or responsive behavior requests a state change. */
  onStateChange?: (state: LayoutSidebarDisplayState) => void;
  /** Sidebar and any internal or external triggers within this scope. */
  children?: ReactNode;
}

export interface LayoutSidebarProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Controlled display state. */
  state?: LayoutSidebarDisplayState;
  /** Initial uncontrolled display state. @default 'expanded' */
  defaultState?: LayoutSidebarDisplayState;
  /** Called when the standalone Sidebar requests a state change. Place state control on SidebarProvider when using a shared scope. */
  onStateChange?: (state: LayoutSidebarDisplayState) => void;
  children?: ReactNode | ((state: LayoutSidebarState) => ReactNode);
}

export interface LayoutSidebarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Action shared with its Sidebar or enclosing SidebarProvider. @default 'toggle' */
  action?: 'toggle' | 'expand' | 'collapse' | 'hide';
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}

export interface LayoutContentProps extends HTMLAttributes<HTMLElement> {
  /** Semantic element for a page main region or an embedded content area. @default 'main' */
  as?: 'main' | 'div';
}

export type LayoutFooterProps = HTMLAttributes<HTMLElement>;
