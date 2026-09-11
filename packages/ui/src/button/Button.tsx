import { Button as PrimitiveButton, type ButtonState } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Button.module.scss';
import type { ButtonProps } from './Button.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

function resolveClassName(className: ButtonProps['className'], state: ButtonState) {
  return typeof className === 'function' ? className(state) : className;
}

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  { variant = 'solid', tone = 'accent', size = 'md', className, ...props },
  forwardedRef,
) {
  const visualState = {
    'data-variant': variant,
    'data-tone': tone,
    'data-size': size,
  } as const;

  return (
    <PrimitiveButton
      {...props}
      {...visualState}
      ref={forwardedRef}
      className={(state) => joinClassNames(styles.root, resolveClassName(className, state))}
    />
  );
});

Button.displayName = 'Button';
