import { forwardRef } from 'react';

import styles from './Separator.module.scss';
import type { SeparatorProps } from './Separator.types';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = 'horizontal', decorative = false, className, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={classes(styles.root, className)}
      data-orientation={orientation}
      data-decorative={decorative ? '' : undefined}
      role={decorative ? undefined : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
    />
  );
});

Separator.displayName = 'Separator';
