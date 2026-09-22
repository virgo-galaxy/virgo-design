import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Breadcrumb items rendered in path order. */
  children: ReactNode;

  /** Decorative content placed between items. */
  separator?: ReactNode;
}

export interface BreadcrumbLinkItemProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'children'
> {
  /** Native link destination. */
  href: string;

  /** Visible item content. */
  children: ReactNode;
}

export interface BreadcrumbCurrentItemProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children'
> {
  href?: undefined;

  /** Visible current-page content. */
  children: ReactNode;
}

export type BreadcrumbItemProps = BreadcrumbLinkItemProps | BreadcrumbCurrentItemProps;
