import { forwardRef } from 'react';

import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { type = 'text', ...props },
  forwardedRef,
) {
  return <input ref={forwardedRef} type={type} {...props} />;
});

Input.displayName = 'Input';
