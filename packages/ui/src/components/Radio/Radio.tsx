import { Radio as PrimitiveRadio } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Radio.module.scss';
import type { RadioProps } from './Radio.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { disabled, children, className, ...props },
  forwardedRef,
) {
  return (
    <label className={joinClassNames(styles.root, className)} data-disabled={disabled || undefined}>
      <PrimitiveRadio
        {...props}
        ref={forwardedRef}
        className={styles.native}
        disabled={disabled}
        data-slot="control"
      />

      <span className={styles.control} aria-hidden="true" data-slot="visual-control">
        <span className={styles.indicator} />
      </span>

      {children !== undefined ? (
        <span className={styles.label} data-slot="label">
          {children}
        </span>
      ) : null}
    </label>
  );
});

Radio.displayName = 'Radio';
