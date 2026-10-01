import type { AriaAttributes } from 'react';
import { createContext, useContext, useLayoutEffect } from 'react';

export type FieldState = {
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  invalid?: boolean | undefined;
};
export const FormStateContext = createContext<FieldState>({});
export type FieldContextValue = FieldState & {
  controlId: string;
  setControlId: (id: string) => void;
  describedBy: string[];
  registerDescription: (id: string) => () => void;
};
export const FieldContext = createContext<FieldContextValue | null>(null);
export function useFieldState() {
  const form = useContext(FormStateContext);
  const field = useContext(FieldContext);
  return field ?? form;
}
type ControlProps = FieldState & AriaAttributes & { id?: string | undefined };
export function useFieldControl<T extends ControlProps>(props: T): T {
  const field = useContext(FieldContext);
  const state = useFieldState();
  const id = props.id ?? field?.controlId;
  const setControlId = field?.setControlId;
  useLayoutEffect(() => {
    if (props.id) setControlId?.(props.id);
  }, [props.id, setControlId]);
  const describedBy =
    [
      ...new Set([
        ...(props['aria-describedby']?.split(/\s+/) ?? []),
        ...(field?.describedBy ?? []),
      ]),
    ]
      .filter(Boolean)
      .join(' ') || undefined;
  return {
    ...props,
    id,
    disabled: props.disabled ?? state.disabled,
    readOnly: props.readOnly ?? state.readOnly,
    required: props.required ?? state.required,
    'aria-describedby': describedBy,
    'aria-invalid': props['aria-invalid'] ?? state.invalid,
    'aria-required': props['aria-required'] ?? props.required ?? state.required,
  };
}
