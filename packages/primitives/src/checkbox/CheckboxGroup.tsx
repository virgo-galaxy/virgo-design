import { forwardRef, useCallback, useMemo, useState } from 'react';

import type { CheckboxGroupProps } from './CheckboxGroup.types';
import { CheckboxGroupContext } from './CheckboxGroupContext';

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(function CheckboxGroup(
  { value, defaultValue = [], onValueChange, name, disabled, children, role = 'group', ...props },
  forwardedRef,
) {
  const [internalValue, setInternalValue] = useState<string[]>(() => [...defaultValue]);
  const isControlled = value !== undefined;
  const values = isControlled ? value : internalValue;

  const toggleValue = useCallback(
    (candidate: string, checked: boolean) => {
      const nextValue = checked
        ? values.includes(candidate)
          ? [...values]
          : [...values, candidate]
        : values.filter((item) => item !== candidate);

      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange, values],
  );

  const contextValue = useMemo(
    () => ({ disabled: Boolean(disabled), name, values, toggleValue }),
    [disabled, name, toggleValue, values],
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div {...props} ref={forwardedRef} role={role} data-disabled={disabled || undefined}>
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
});

CheckboxGroup.displayName = 'Checkbox.Group';
