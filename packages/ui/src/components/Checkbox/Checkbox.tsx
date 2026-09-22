import { CheckIcon, MinusIcon } from '@virgo-design/icons';
import { Checkbox as PrimitiveCheckbox } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Checkbox.module.scss';
import type { CheckboxProps } from './Checkbox.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { indeterminate = false, disabled, children, className, ...props },
  forwardedRef,
) {
  return (
    <label className={joinClassNames(styles.root, className)} data-disabled={disabled || undefined}>
      <PrimitiveCheckbox
        {...props}
        ref={forwardedRef}
        className={styles.native}
        disabled={disabled}
        indeterminate={indeterminate}
        data-slot="control"
      />

      <span className={styles.control} aria-hidden="true" data-slot="visual-control">
        <CheckIcon className={styles.checkIcon} />
        <MinusIcon className={styles.indeterminateIcon} />
      </span>

      {children !== undefined ? (
        <span className={styles.label} data-slot="label">
          {children}
        </span>
      ) : null}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
