import type { AnchorHTMLAttributes, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';

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
  /** Router adapter; forward all attributes, children and ref to a native link. */
  render?: (
    props: AnchorHTMLAttributes<HTMLAnchorElement> & { ref: Ref<HTMLAnchorElement> },
  ) => ReactElement;
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
  render?: never;

  /** Visible current-page content. */
  children: ReactNode;
}

export type BreadcrumbItemProps = BreadcrumbLinkItemProps | BreadcrumbCurrentItemProps;
