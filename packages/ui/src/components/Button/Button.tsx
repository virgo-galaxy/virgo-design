import { Button as PrimitiveButton } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Button.module.scss';
import type { ButtonProps } from './Button.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'medium',
    iconOnly = false,
    shape = 'square',
    leadingIcon,
    trailingIcon,
    children,
    className,
    ...props
  },
  forwardedRef,
) {
  return (
    <PrimitiveButton
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.root, className)}
      data-icon-only={iconOnly || undefined}
      data-shape={iconOnly ? shape : undefined}
      data-size={size}
      data-variant={variant}
    >
      {iconOnly ? (
        <span className={styles.icon} data-slot="icon" aria-hidden="true">
          {children}
        </span>
      ) : (
        <>
          {leadingIcon ? (
            <span className={styles.icon} data-slot="leading-icon" aria-hidden="true">
              {leadingIcon}
            </span>
          ) : null}

          <span className={styles.label} data-slot="label">
            {children}
          </span>

          {trailingIcon ? (
            <span className={styles.icon} data-slot="trailing-icon" aria-hidden="true">
              {trailingIcon}
            </span>
          ) : null}
        </>
      )}
    </PrimitiveButton>
  );
});

Button.displayName = 'Button';
