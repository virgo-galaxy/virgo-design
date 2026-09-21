import type { HTMLAttributes, ReactNode } from 'react';

export type LayoutDirection = 'vertical' | 'horizontal';

export interface LayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Structural regions rendered in document order. */
  children: ReactNode;

  /** Direction in which the direct child regions are arranged. */
  direction?: LayoutDirection;
}

export type LayoutHeaderProps = HTMLAttributes<HTMLElement>;

export interface LayoutSiderProps extends HTMLAttributes<HTMLElement> {
  /** Structural width of the side region. */
  width?: number | string;
}

export type LayoutContentProps = HTMLAttributes<HTMLElement>;

export type LayoutFooterProps = HTMLAttributes<HTMLElement>;
