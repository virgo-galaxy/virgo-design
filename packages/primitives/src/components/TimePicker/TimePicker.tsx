import { forwardRef } from 'react';

import { useFieldControl } from '../../internal/form/field-context';
import { useControllableState } from '../../internal/hooks/useControllableState';
import type { TimePickerProps } from './TimePicker.types';
export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(function TimePicker(
  { value: controlled, defaultValue = '', onValueChange, onChange, ...props },
  ref,
) {
  const field = useFieldControl(props);
  const [value, setValue] = useControllableState(controlled, defaultValue, onValueChange);
  return (
    <input
      {...field}
      ref={ref}
      type="time"
      value={value}
      onChange={(event) => {
        if (field.readOnly) return;
        onChange?.(event);
        if (!event.defaultPrevented) setValue(event.currentTarget.value);
      }}
    />
  );
});
