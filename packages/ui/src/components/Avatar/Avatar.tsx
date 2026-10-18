import { forwardRef, useEffect, useState } from 'react';

import type { AvatarGroupProps, AvatarProps } from './Avatar.types';

import styles from './Avatar.module.scss';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

const Root = forwardRef<HTMLSpanElement, AvatarProps>(function AvatarRoot(
  { src, alt = '', fallback, size = 'md', shape = 'circle', loading, className, ...props },
  ref,
) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showImage = Boolean(src) && !failed;

  return (
    <span
      {...props}
      ref={ref}
      className={classes(styles.root, className)}
      data-size={size}
      data-shape={shape}
    >
      {showImage ? (
        <img
          className={styles.image}
          src={src}
          alt={alt}
          loading={loading}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={styles.fallback}>{fallback}</span>
      )}
    </span>
  );
});

const Group = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.group, className)} />;
});

Root.displayName = 'Avatar';
Group.displayName = 'Avatar.Group';

export const Avatar = Object.assign(Root, { Root, Group });
