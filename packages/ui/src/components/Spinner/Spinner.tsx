import { forwardRef } from 'react';

import styles from './Spinner.module.scss';
import type { SpinnerProps } from './Spinner.types';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  {
    size = 'md',
    intent = 'current',
    className,
    role,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...props
  },
  ref,
) {
  const isLabeled = Boolean(ariaLabel);

  return (
    <span
      {...props}
      ref={ref}
      className={classes(styles.root, className)}
      data-size={size}
      data-intent={intent}
      data-motion="spin"
      role={role ?? (isLabeled ? 'status' : undefined)}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? (isLabeled ? undefined : 'true')}
    />
  );
});

Spinner.displayName = 'Spinner';
