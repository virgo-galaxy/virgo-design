import { forwardRef, useEffect, useRef } from 'react';

import { composeRefs } from '../../internal/utils/composeRefs';
import type { CheckboxProps } from './Checkbox.types';
import { useCheckboxGroupContext } from './CheckboxGroupContext';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    indeterminate = false,
    value,
    checked,
    defaultChecked,
    disabled,
    name,
    onChange,
    'aria-checked': ariaChecked,
    ...props
  },
  forwardedRef,
) {
  const internalRef = useRef<HTMLInputElement | null>(null);
  const group = useCheckboxGroupContext();
  const groupValue =
    typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;
  const isGroupManaged = group !== null && groupValue !== undefined;
  const resolvedDisabled = Boolean(disabled || group?.disabled);
  const resolvedChecked = isGroupManaged ? group.values.includes(groupValue) : checked;

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      {...props}
      ref={composeRefs(forwardedRef, internalRef)}
      type="checkbox"
      name={name ?? group?.name}
      value={value}
      checked={resolvedChecked}
      defaultChecked={isGroupManaged ? undefined : defaultChecked}
      disabled={resolvedDisabled}
      aria-checked={indeterminate ? 'mixed' : ariaChecked}
      data-indeterminate={indeterminate || undefined}
      onChange={(event) => {
        onChange?.(event);

        if (!event.defaultPrevented && isGroupManaged) {
          group.toggleValue(groupValue, event.currentTarget.checked);
        }

        if (indeterminate) {
          event.currentTarget.indeterminate = true;
        }
      }}
    />
  );
});

Checkbox.displayName = 'Checkbox';
