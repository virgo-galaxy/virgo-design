import { useCallback, useState } from 'react';

export function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T | undefined,
  onChange?: (value: T) => void,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue === undefined ? uncontrolledValue : controlledValue;
  const setValue = useCallback(
    (nextValue: T) => {
      if (controlledValue === undefined) setUncontrolledValue(nextValue);
      if (!Object.is(nextValue, value)) onChange?.(nextValue);
    },
    [controlledValue, onChange, value],
  );
  // Silent resets are for internal lifecycle changes, not user-change notifications.
  return [value, setValue, setUncontrolledValue] as const;
}
