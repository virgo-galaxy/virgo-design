import { Button as PrimitiveButton } from '@virgo-design/primitives';
import { forwardRef, useContext } from 'react';

import { ActionGroupSizeContext } from '../../internal/action-group/ActionGroupContext';
import type { ButtonProps } from './Button.types';
import { ButtonGroup } from './ButtonGroup';

import styles from './Button.module.scss';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

const ButtonRoot = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size: sizeProp,
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
  const inheritedSize = useContext(ActionGroupSizeContext);
  const size = sizeProp ?? inheritedSize ?? 'medium';

  return (
    <PrimitiveButton
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.root, className)}
      data-vd-button=""
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

ButtonRoot.displayName = 'Button';
export const Button = Object.assign(ButtonRoot, { Group: ButtonGroup });
