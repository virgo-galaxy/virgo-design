import { Breadcrumb as PrimitiveBreadcrumb } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Breadcrumb.module.scss';
import type { BreadcrumbProps } from './Breadcrumb.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveBreadcrumb
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.root, className)}
    />
  );
});

Breadcrumb.displayName = 'Breadcrumb';
