import { forwardRef, useEffect, useRef } from 'react';

import { useFieldControl } from '../../internal/form/field-context';
import { preventReadOnlyChoice } from '../../internal/form/prevent-readonly-choice';
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
  const fieldProps = useFieldControl({ ...props, disabled });
  const group = useCheckboxGroupContext();
  const groupValue =
    typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;
  const isGroupManaged = group !== null && groupValue !== undefined;
  const resolvedDisabled = Boolean(fieldProps.disabled || group?.disabled);
  const resolvedChecked = isGroupManaged ? group.values.includes(groupValue) : checked;

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      {...fieldProps}
      ref={composeRefs(forwardedRef, internalRef)}
      type="checkbox"
      name={name ?? group?.name}
      value={value}
      checked={resolvedChecked}
      data-checked={resolvedChecked}
      defaultChecked={isGroupManaged ? undefined : defaultChecked}
      disabled={resolvedDisabled}
      aria-checked={indeterminate ? 'mixed' : ariaChecked}
      data-indeterminate={indeterminate || undefined}
      aria-readonly={fieldProps.readOnly || undefined}
      onClick={(event) => {
        props.onClick?.(event);
        if (fieldProps.readOnly) preventReadOnlyChoice(event, resolvedChecked);
      }}
      onChange={(event) => {
        if (fieldProps.readOnly) return;
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
