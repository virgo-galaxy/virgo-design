import { Switch as PrimitiveSwitch } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import type { SwitchProps } from './Switch.types';

import styles from './Switch.module.scss';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    appearance = 'toggle',
    size = 'default',
    checkedContent,
    uncheckedContent,
    children,
    disabled,
    className,
    ...props
  },
  forwardedRef,
) {
  const hasContent =
    appearance === 'toggle' && (checkedContent !== undefined || uncheckedContent !== undefined);

  return (
    <label
      className={joinClassNames(styles.root, className)}
      data-appearance={appearance}
      data-disabled={disabled || undefined}
      data-has-content={hasContent || undefined}
      data-size={size}
    >
      <PrimitiveSwitch
        {...props}
        ref={forwardedRef}
        className={styles.native}
        disabled={disabled}
        data-slot="control"
      />

      <span className={styles.control} aria-hidden="true" data-slot="visual-control">
        <span className={styles.rail} />

        {appearance === 'toggle' && hasContent ? (
          <span className={styles.contents}>
            <span className={styles.checkedContent}>{checkedContent}</span>
            <span className={styles.uncheckedContent}>{uncheckedContent}</span>
          </span>
        ) : null}

        <span className={styles.thumb} />
      </span>

      {children !== undefined ? (
        <span className={styles.label} data-slot="label">
          {children}
        </span>
      ) : null}
    </label>
  );
});

Switch.displayName = 'Switch';
