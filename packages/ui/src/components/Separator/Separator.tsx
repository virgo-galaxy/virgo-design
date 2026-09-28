import { forwardRef, useId } from 'react';

import styles from './Separator.module.scss';
import type { SeparatorProps } from './Separator.types';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  {
    orientation = 'horizontal',
    decorative = false,
    labelAlign = 'center',
    children,
    className,
    ...props
  },
  ref,
) {
  const labelId = useId();
  const hasLabel =
    orientation === 'horizontal' && children != null && children !== false && children !== '';

  return (
    <div
      {...props}
      ref={ref}
      className={classes(styles.root, className)}
      data-orientation={orientation}
      data-decorative={decorative ? '' : undefined}
      data-label-align={hasLabel ? labelAlign : undefined}
      role={decorative ? undefined : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      aria-labelledby={
        props['aria-labelledby'] ??
        (!decorative && hasLabel && !props['aria-label'] ? labelId : undefined)
      }
    >
      {hasLabel ? (
        <span id={labelId} className={styles.label} data-slot="label">
          {children}
        </span>
      ) : null}
    </div>
  );
});

Separator.displayName = 'Separator';
