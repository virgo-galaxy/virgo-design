import { CloseIcon } from '@virgo-design/icons';
import { forwardRef } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import type { TagProps } from './Tag.types';

import styles from './Tag.module.scss';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    intent = 'neutral',
    variant = 'soft',
    size = 'md',
    icon,
    closable = false,
    disabled = false,
    closeLabel,
    onClose,
    className,
    children,
    ...props
  },
  ref,
) {
  const locale = useLocale();

  return (
    <span
      {...props}
      ref={ref}
      className={classes(styles.root, className)}
      data-intent={intent}
      data-variant={variant}
      data-size={size}
      data-disabled={closable && disabled ? '' : undefined}
    >
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
      {closable ? (
        <button
          className={styles.close}
          type="button"
          aria-label={closeLabel ?? locale.tag.remove}
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation();
            onClose?.(event);
          }}
        >
          <CloseIcon aria-hidden="true" />
        </button>
      ) : null}
    </span>
  );
});

Tag.displayName = 'Tag';
