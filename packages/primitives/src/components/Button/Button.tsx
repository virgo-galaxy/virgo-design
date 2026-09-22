import { forwardRef } from 'react';

import type { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { type = 'button', ...props },
  forwardedRef,
) {
  return <button ref={forwardedRef} type={type} {...props} />;
});

Button.displayName = 'Button';
