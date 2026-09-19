import { forwardRef } from 'react';

import type { RadioProps } from './Radio.types';
import { useRadioGroupContext } from './RadioGroupContext';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, checked, defaultChecked, disabled, name, onChange, ...props },
  forwardedRef,
) {
  const group = useRadioGroupContext();
  const groupValue =
    typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;
  const isGroupManaged = group !== null && groupValue !== undefined;
  const resolvedDisabled = Boolean(disabled || group?.disabled);
  const resolvedChecked = isGroupManaged ? group.value === groupValue : checked;

  return (
    <input
      {...props}
      ref={forwardedRef}
      type="radio"
      name={name ?? group?.name}
      value={value}
      checked={resolvedChecked}
      defaultChecked={isGroupManaged ? undefined : defaultChecked}
      disabled={resolvedDisabled}
      onChange={(event) => {
        onChange?.(event);

        if (!event.defaultPrevented && isGroupManaged && event.currentTarget.checked) {
          group.selectValue(groupValue);
        }
      }}
    />
  );
});

Radio.displayName = 'Radio';
