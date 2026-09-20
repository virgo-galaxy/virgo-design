import { BreadcrumbItem as PrimitiveBreadcrumbItem } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Breadcrumb.module.scss';
import type { BreadcrumbItemProps } from './Breadcrumb.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const BreadcrumbItem = forwardRef<HTMLAnchorElement | HTMLSpanElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ icon, children, className, ...props }, forwardedRef) {
    return (
      <PrimitiveBreadcrumbItem
        {...props}
        ref={forwardedRef}
        className={joinClassNames(styles.item, className)}
      >
        {icon !== undefined ? (
          <span aria-hidden="true" className={styles.icon} data-slot="icon">
            {icon}
          </span>
        ) : null}
        <span className={styles.label} data-slot="label">
          {children}
        </span>
      </PrimitiveBreadcrumbItem>
    );
  },
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
