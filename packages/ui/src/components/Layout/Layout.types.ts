import type {
  LayoutContentProps as PrimitiveLayoutContentProps,
  LayoutDirection,
  LayoutFooterProps as PrimitiveLayoutFooterProps,
  LayoutHeaderProps as PrimitiveLayoutHeaderProps,
  LayoutProps as PrimitiveLayoutProps,
  LayoutSiderProps as PrimitiveLayoutSiderProps,
} from '@virgo-design/primitives';

export type { LayoutDirection };

export interface LayoutProps extends Omit<PrimitiveLayoutProps, 'className'> {
  /** Consumer class applied to the layout container. */
  className?: string;
}

export interface LayoutHeaderProps extends Omit<PrimitiveLayoutHeaderProps, 'className'> {
  /** Consumer class applied to the header region. */
  className?: string;
}

export interface LayoutSiderProps extends Omit<PrimitiveLayoutSiderProps, 'className'> {
  /** Consumer class applied to the side region. */
  className?: string;
}

export interface LayoutContentProps extends Omit<PrimitiveLayoutContentProps, 'className'> {
  /** Consumer class applied to the main content region. */
  className?: string;
}

export interface LayoutFooterProps extends Omit<PrimitiveLayoutFooterProps, 'className'> {
  /** Consumer class applied to the footer region. */
  className?: string;
}
