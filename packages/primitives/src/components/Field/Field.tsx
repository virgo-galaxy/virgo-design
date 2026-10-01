import { forwardRef, useCallback, useContext, useId, useLayoutEffect, useState } from 'react';

import { FieldContext, FormStateContext, useFieldControl } from '../../internal/form/field-context';
import type {
  FieldControlProps,
  FieldDescriptionProps,
  FieldLabelProps,
  FieldMessageProps,
  FieldProps,
} from './Field.types';
export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { controlId, disabled, readOnly, required, invalid, ...props },
  ref,
) {
  const form = useContext(FormStateContext);
  const generated = useId();
  const [registeredControlId, setControlId] = useState(`${generated}-control`);
  const [describedBy, setDescriptions] = useState<string[]>([]);
  const registerDescription = useCallback((id: string) => {
    setDescriptions((old) => (old.includes(id) ? old : [...old, id]));
    return () => setDescriptions((old) => old.filter((value) => value !== id));
  }, []);
  const state = {
    disabled: disabled ?? form.disabled,
    readOnly: readOnly ?? form.readOnly,
    required,
    invalid,
  };
  return (
    <FieldContext.Provider
      value={{
        ...state,
        controlId: controlId ?? registeredControlId,
        setControlId,
        describedBy,
        registerDescription,
      }}
    >
      <div
        {...props}
        ref={ref}
        data-disabled={state.disabled || undefined}
        data-readonly={state.readOnly || undefined}
        data-required={required || undefined}
        data-invalid={invalid || undefined}
      />
    </FieldContext.Provider>
  );
});
export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(function FieldLabel(
  { children, htmlFor, ...props },
  ref,
) {
  const field = useContext(FieldContext);
  return (
    <label {...props} ref={ref} htmlFor={htmlFor ?? field?.controlId}>
      {children}
      {field?.required ? (
        <span aria-hidden="true" data-field-required="">
          {' '}
          *
        </span>
      ) : null}
    </label>
  );
});
function useDescription(id: string | undefined) {
  const generated = useId();
  const resolved = id ?? generated;
  const register = useContext(FieldContext)?.registerDescription;
  useLayoutEffect(() => register?.(resolved), [register, resolved]);
  return resolved;
}
export const FieldDescription = forwardRef<HTMLDivElement, FieldDescriptionProps>(
  function FieldDescription({ id, ...props }, ref) {
    return <div {...props} ref={ref} id={useDescription(id)} data-field-description="" />;
  },
);
export const FieldMessage = forwardRef<HTMLDivElement, FieldMessageProps>(function FieldMessage(
  { id, ...props },
  ref,
) {
  return (
    <div aria-live="polite" {...props} ref={ref} id={useDescription(id)} data-field-message="" />
  );
});
export function FieldControl({ render }: FieldControlProps) {
  return <>{render(useFieldControl({}))}</>;
}
