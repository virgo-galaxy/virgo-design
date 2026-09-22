import type {
  BreadcrumbCurrentItemProps as PrimitiveBreadcrumbCurrentItemProps,
  BreadcrumbLinkItemProps as PrimitiveBreadcrumbLinkItemProps,
  BreadcrumbProps as PrimitiveBreadcrumbProps,
} from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export interface BreadcrumbProps extends Omit<PrimitiveBreadcrumbProps, 'className'> {
  /** Consumer class applied to the breadcrumb navigation. */
  className?: string;
}

interface BreadcrumbItemSharedProps {
  /** Visible item content, including dynamic ReactNode values. */
  children: ReactNode;

  /** Optional decorative icon before the item content. */
  icon?: ReactNode;

  /** Consumer class applied to the link or current-page element. */
  className?: string;
}

export type BreadcrumbItemProps = BreadcrumbItemSharedProps &
  (
    | Omit<PrimitiveBreadcrumbLinkItemProps, 'children' | 'className'>
    | Omit<PrimitiveBreadcrumbCurrentItemProps, 'children' | 'className'>
  );
