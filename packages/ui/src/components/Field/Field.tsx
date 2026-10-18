import { Field as PrimitiveField } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import type {
  FieldDescriptionProps,
  FieldLabelProps,
  FieldMessageProps,
  FieldProps,
} from './Field.types';

import styles from './Field.module.scss';

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { layout, className, ...props },
  ref,
) {
  return (
    <PrimitiveField
      {...props}
      ref={ref}
      data-layout={layout}
      className={[styles.root, className].filter(Boolean).join(' ')}
    />
  );
});

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(function FieldLabel(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveField.Label
      {...props}
      ref={ref}
      className={[styles.label, className].filter(Boolean).join(' ')}
    />
  );
});

export const FieldDescription = forwardRef<HTMLDivElement, FieldDescriptionProps>(
  function FieldDescription({ className, ...props }, ref) {
    return (
      <PrimitiveField.Description
        {...props}
        ref={ref}
        className={[styles.description, className].filter(Boolean).join(' ')}
      />
    );
  },
);

export const FieldMessage = forwardRef<HTMLDivElement, FieldMessageProps>(function FieldMessage(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveField.Message
      {...props}
      ref={ref}
      className={[styles.message, className].filter(Boolean).join(' ')}
    />
  );
});

export const FieldControl = PrimitiveField.Control;
