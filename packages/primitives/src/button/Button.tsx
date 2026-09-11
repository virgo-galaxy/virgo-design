import { Button as BaseButton } from '@base-ui/react/button';
import { type ComponentProps, forwardRef } from 'react';

import type { ButtonProps } from './Button.types';

type BaseButtonProps = ComponentProps<typeof BaseButton>;

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(props, forwardedRef) {
  return (
    <BaseButton {...(props as BaseButtonProps)} ref={forwardedRef as BaseButtonProps['ref']} />
  );
});

Button.displayName = 'Button';
