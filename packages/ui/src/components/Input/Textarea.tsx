import { Textarea as PrimitiveTextarea } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import type { TextareaProps } from './Textarea.types';

import styles from './Textarea.module.scss';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

function hasAriaInvalidValue(value: TextareaProps['aria-invalid']) {
  return value !== undefined && value !== false && value !== 'false';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    size = 'medium',
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
    <PrimitiveTextarea
      {...props}
      ref={forwardedRef}
      aria-invalid={invalid ? true : ariaInvalid}
      className={joinClassNames(styles.root, className)}
      data-disabled={disabled || undefined}
      data-invalid={isInvalid || undefined}
      data-readonly={readOnly || undefined}
      data-size={size}
      data-slot="control"
      disabled={disabled}
      readOnly={readOnly}
    />
  );
});

Textarea.displayName = 'Textarea';
