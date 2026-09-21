import { forwardRef, useCallback, useId, useMemo, useState } from 'react';

import type { RadioGroupProps } from './RadioGroup.types';
import { RadioGroupContext } from './RadioGroupContext';

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    value,
    defaultValue,
    onValueChange,
    name,
    disabled,
    orientation = 'horizontal',
    children,
    role = 'radiogroup',
    ...props
  },
  forwardedRef,
) {
  const generatedName = useId();
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;
  const resolvedName = name ?? `vd-radio-${generatedName}`;

  const selectValue = useCallback(
    (candidate: string) => {
      if (!isControlled) {
        setInternalValue(candidate);
      }

      onValueChange?.(candidate);
    },
    [isControlled, onValueChange],
  );

  const contextValue = useMemo(
    () => ({
      disabled: Boolean(disabled),
      name: resolvedName,
      value: selectedValue,
      selectValue,
    }),
    [disabled, resolvedName, selectValue, selectedValue],
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        {...props}
        ref={forwardedRef}
        role={role}
        aria-orientation={orientation}
        data-disabled={disabled || undefined}
        data-orientation={orientation}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});

RadioGroup.displayName = 'Radio.Group';
