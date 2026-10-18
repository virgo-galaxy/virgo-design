import { forwardRef } from 'react';

import type { SkeletonProps } from './Skeleton.types';

import styles from './Skeleton.module.scss';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  {
    variant = 'rectangle',
    animated = true,
    className,
    'aria-hidden': ariaHidden = 'true',
    ...props
  },
  ref,
) {
  return (
    <span
      {...props}
      ref={ref}
      className={classes(styles.root, className)}
      data-variant={variant}
      data-animated={animated ? '' : undefined}
      aria-hidden={ariaHidden}
    />
  );
});

Skeleton.displayName = 'Skeleton';
