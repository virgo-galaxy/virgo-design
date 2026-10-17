import { Breadcrumb as PrimitiveBreadcrumb } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import styles from './Breadcrumb.module.scss';
import type { BreadcrumbProps } from './Breadcrumb.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { className, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props },
  forwardedRef,
) {
  const locale = useLocale();

  return (
    <PrimitiveBreadcrumb
      {...props}
      ref={forwardedRef}
      aria-label={
        ariaLabel ?? (ariaLabelledBy === undefined ? locale.breadcrumb.navigation : undefined)
      }
      aria-labelledby={ariaLabelledBy}
      className={joinClassNames(styles.root, className)}
    />
  );
});

Breadcrumb.displayName = 'Breadcrumb';
