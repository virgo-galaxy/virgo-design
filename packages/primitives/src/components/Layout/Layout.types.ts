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

export interface LayoutSidebarState {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export interface LayoutSidebarProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  children?: ReactNode | ((state: LayoutSidebarState) => ReactNode);
}

export interface LayoutSidebarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}

export type LayoutContentProps = HTMLAttributes<HTMLElement>;

export type LayoutFooterProps = HTMLAttributes<HTMLElement>;
