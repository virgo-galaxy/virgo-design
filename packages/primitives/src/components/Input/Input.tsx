import { forwardRef } from 'react';

import { useFieldControl } from '../../internal/form/field-context';
import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { type = 'text', ...props },
  forwardedRef,
) {
  return <input ref={forwardedRef} type={type} {...useFieldControl(props)} />;
});

Input.displayName = 'Input';
