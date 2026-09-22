import { forwardRef } from 'react';

import type { SwitchProps } from './Switch.types';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { onChange, onCheckedChange, ...props },
  forwardedRef,
) {
  return (
    <input
      {...props}
      ref={forwardedRef}
      role="switch"
      type="checkbox"
      onChange={(event) => {
        onChange?.(event);

        if (!event.defaultPrevented) {
          onCheckedChange?.(event.currentTarget.checked);
        }
      }}
    />
  );
});

Switch.displayName = 'Switch';
