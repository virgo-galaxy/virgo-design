import { forwardRef, useRef } from 'react';

import { useFieldControl } from '../../internal/form/field-context';
import { preventReadOnlyChoice } from '../../internal/form/prevent-readonly-choice';
import type { RadioProps } from './Radio.types';
import { useRadioGroupContext } from './RadioGroupContext';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, checked, defaultChecked, disabled, name, onChange, ...props },
  forwardedRef,
) {
  const lastChecked = useRef(defaultChecked ?? false);
  const fieldProps = useFieldControl({ ...props, disabled });
  const group = useRadioGroupContext();
  const groupValue =
    typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;
  const isGroupManaged = group !== null && groupValue !== undefined;
  const resolvedDisabled = Boolean(fieldProps.disabled || group?.disabled);
  const resolvedChecked = isGroupManaged ? group.value === groupValue : checked;

  return (
    <input
      {...fieldProps}
      ref={forwardedRef}
      type="radio"
      name={name ?? group?.name}
      value={value}
      checked={resolvedChecked}
      defaultChecked={isGroupManaged ? undefined : defaultChecked}
      disabled={resolvedDisabled}
      aria-readonly={fieldProps.readOnly || undefined}
      onClick={(event) => {
        props.onClick?.(event);
        if (fieldProps.readOnly)
          preventReadOnlyChoice(event, resolvedChecked ?? lastChecked.current);
      }}
      onChange={(event) => {
        if (fieldProps.readOnly) return;
        lastChecked.current = event.currentTarget.checked;
        onChange?.(event);

        if (!event.defaultPrevented && isGroupManaged && event.currentTarget.checked) {
          group.selectValue(groupValue);
        }
      }}
    />
  );
});

Radio.displayName = 'Radio';
