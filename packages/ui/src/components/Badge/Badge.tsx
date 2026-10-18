import { forwardRef } from 'react';

import type { BadgeProps } from './Badge.types';

import styles from './Badge.module.scss';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    count,
    max = 99,
    showZero = false,
    dot = false,
    animation = 'none',
    intent = 'default',
    className,
    children,
    'aria-label': ariaLabel,
    ...props
  },
  ref,
) {
  const hasChildren = children !== undefined && children !== null;
  const visible = dot || (count !== undefined && count !== null && (count !== 0 || showZero));
  const content = typeof count === 'number' && count > max ? `${max}+` : count;

  return (
    <span
      {...props}
      ref={ref}
      className={classes(styles.root, className)}
      data-standalone={hasChildren ? undefined : ''}
    >
      {children}
      {visible ? (
        <span
          className={styles.indicator}
          data-dot={dot ? '' : undefined}
          data-animation={dot && animation !== 'none' ? animation : undefined}
          data-intent={intent}
          role={ariaLabel ? 'img' : undefined}
          aria-label={ariaLabel}
          aria-hidden={dot && !ariaLabel ? 'true' : undefined}
        >
          {dot ? null : content}
        </span>
      ) : null}
    </span>
  );
});

Badge.displayName = 'Badge';
