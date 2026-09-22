import { Input as PrimitiveInput } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Input.module.scss';
import type { InputProps } from './Input.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

function hasAriaInvalidValue(value: InputProps['aria-invalid']) {
  return value !== undefined && value !== false && value !== 'false';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'medium',
    leadingIcon,
    trailingIcon,
    invalid = false,
    disabled,
    readOnly,
    className,
    'aria-invalid': ariaInvalid,
    ...props
  },
  forwardedRef,
) {
  const isInvalid = invalid || hasAriaInvalidValue(ariaInvalid);

  return (
    <span
      className={styles.root}
      data-disabled={disabled || undefined}
      data-invalid={isInvalid || undefined}
      data-readonly={readOnly || undefined}
      data-size={size}
    >
      {leadingIcon ? (
        <span className={styles.icon} data-slot="leading-icon" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}

      <PrimitiveInput
        {...props}
        ref={forwardedRef}
        aria-invalid={invalid ? true : ariaInvalid}
        className={joinClassNames(styles.control, className)}
        disabled={disabled}
        readOnly={readOnly}
        data-slot="control"
      />

      {trailingIcon ? (
        <span className={styles.icon} data-slot="trailing-icon" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </span>
  );
});

Input.displayName = 'Input';
