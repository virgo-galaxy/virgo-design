import { Radio as PrimitiveRadio } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './SegmentedControl.module.scss';
import type { SegmentedControlItemProps } from './SegmentedControl.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const SegmentedControlItem = forwardRef<HTMLInputElement, SegmentedControlItemProps>(
  function SegmentedControlItem({ children, className, disabled, value, ...props }, forwardedRef) {
    return (
      <label
        className={joinClassNames(styles.item, className)}
        data-disabled={disabled || undefined}
        data-segment-value={value}
      >
        <PrimitiveRadio
          {...props}
          ref={forwardedRef}
          className={styles.native}
          disabled={disabled}
          value={value}
        />
        <span className={styles.label}>{children}</span>
      </label>
    );
  },
);

SegmentedControlItem.displayName = 'SegmentedControlItem';
