import { createContext, forwardRef, useContext } from 'react';

import { useFieldControl, useFieldState } from '../../internal/form/field-context';
import { useControllableState } from '../../internal/hooks/useControllableState';
import type {
  ColorPickerInputProps,
  ColorPickerPreviewProps,
  ColorPickerProps,
  ColorPickerSwatchProps,
} from './ColorPicker.types';
const normalize = (value: string) =>
  /^#[0-9a-f]{6}$/i.test(value) ? value.toLowerCase() : '#000000';
const Context = createContext<{
  value: string;
  disabled: boolean;
  readOnly: boolean;
  setValue: (value: string) => void;
} | null>(null);
function useColor() {
  const context = useContext(Context);
  if (!context) throw new Error('ColorPicker parts require ColorPicker.');
  return context;
}
export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(function ColorPicker(
  {
    value: controlled,
    defaultValue = '#000000',
    onValueChange,
    name,
    disabled: localDisabled,
    readOnly: localReadOnly,
    children,
    ...props
  },
  ref,
) {
  const field = useFieldState();
  const disabled = localDisabled ?? field.disabled ?? false;
  const readOnly = localReadOnly ?? field.readOnly ?? false;
  const [raw = '', setRaw] = useControllableState(
    controlled,
    normalize(defaultValue),
    onValueChange,
  );
  const value = normalize(raw);
  return (
    <Context.Provider
      value={{
        value,
        disabled,
        readOnly,
        setValue: (next) => {
          if (!disabled && !readOnly && /^#[0-9a-f]{6}$/i.test(next)) setRaw(normalize(next));
        },
      }}
    >
      <div
        {...props}
        ref={ref}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
      >
        {name ? <input type="hidden" name={name} value={value} disabled={disabled} /> : null}
        {children}
      </div>
    </Context.Provider>
  );
});
export const ColorPickerInput = forwardRef<HTMLInputElement, ColorPickerInputProps>(
  function ColorPickerInput({ onChange, onClick, ...props }, ref) {
    const context = useColor();
    const field = useFieldControl(props);
    return (
      <input
        {...field}
        ref={ref}
        type="color"
        value={context.value}
        disabled={context.disabled || field.disabled}
        aria-readonly={context.readOnly || field.readOnly || undefined}
        onClick={(event) => {
          onClick?.(event);
          if (context.readOnly || field.readOnly) event.preventDefault();
        }}
        onChange={(event) => {
          if (context.readOnly || field.readOnly) return;
          onChange?.(event);
          if (!event.defaultPrevented) context.setValue(event.currentTarget.value);
        }}
      />
    );
  },
);
export const ColorPickerSwatch = forwardRef<HTMLButtonElement, ColorPickerSwatchProps>(
  function ColorPickerSwatch({ value, onClick, ...props }, ref) {
    const context = useColor();
    return (
      <button
        type="button"
        aria-label={value}
        {...props}
        ref={ref}
        aria-pressed={context.value === normalize(value)}
        disabled={context.disabled || context.readOnly || props.disabled}
        data-color={normalize(value)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) context.setValue(value);
        }}
      />
    );
  },
);
export const ColorPickerPreview = forwardRef<HTMLSpanElement, ColorPickerPreviewProps>(
  function ColorPickerPreview({ style, ...props }, ref) {
    const context = useColor();
    return (
      <span
        aria-hidden="true"
        {...props}
        ref={ref}
        data-color={context.value}
        style={{ backgroundColor: context.value, ...style }}
      />
    );
  },
);
