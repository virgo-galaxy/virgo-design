import { forwardRef } from 'react';

import { useFieldControl } from '../../internal/form/field-context';
import { useControllableState } from '../../internal/hooks/useControllableState';
import type { SliderProps } from './Slider.types';
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    value: controlled,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    onValueChange,
    onChange,
    onKeyDown,
    onPointerDown,
    ...props
  },
  ref,
) {
  const field = useFieldControl(props);
  const [value, setValue] = useControllableState(
    controlled,
    defaultValue ?? (Number(min) + Number(max)) / 2,
    onValueChange,
  );
  return (
    <input
      {...field}
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      aria-readonly={field.readOnly || undefined}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (field.readOnly) event.preventDefault();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          field.readOnly &&
          [
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Home',
            'End',
            'PageUp',
            'PageDown',
          ].includes(event.key)
        )
          event.preventDefault();
      }}
      onChange={(event) => {
        if (field.readOnly) {
          event.currentTarget.value = String(value);
          return;
        }
        onChange?.(event);
        if (!event.defaultPrevented) setValue(event.currentTarget.valueAsNumber);
      }}
    />
  );
});
