import { forwardRef } from 'react';

import { useFieldControl } from '../../internal/form/field-context';
import { preventReadOnlyChoice } from '../../internal/form/prevent-readonly-choice';
import type { SwitchProps } from './Switch.types';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { onChange, onCheckedChange, ...props },
  forwardedRef,
) {
  const fieldProps = useFieldControl({ ...props });
  return (
    <input
      {...fieldProps}
      ref={forwardedRef}
      role="switch"
      type="checkbox"
      aria-readonly={fieldProps.readOnly || undefined}
      onClick={(event) => {
        props.onClick?.(event);
        if (fieldProps.readOnly) preventReadOnlyChoice(event, fieldProps.checked);
      }}
      onChange={(event) => {
        if (fieldProps.readOnly) return;
        onChange?.(event);

        if (!event.defaultPrevented) {
          onCheckedChange?.(event.currentTarget.checked);
        }
      }}
    />
  );
});

Switch.displayName = 'Switch';
