import { CursorArrowIcon } from '@virgo-design/icons';
import { Cursor as PrimitiveCursor } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Cursor.module.scss';
import type { CursorFollowerProps, CursorProviderProps, CursorVisualProps } from './Cursor.types';

const visualSizes = { sm: 16, md: 20, lg: 24 } as const;

function Visual({ size = 'md', className, ...props }: CursorVisualProps) {
  return (
    <CursorArrowIcon
      {...props}
      size={visualSizes[size]}
      data-size={size}
      aria-hidden="true"
      className={[styles.glyph, className].filter(Boolean).join(' ')}
    />
  );
}
const Provider = forwardRef<HTMLDivElement, CursorProviderProps>(function CursorProvider(
  { cursor, size = 'md', hotspot, className, visualClassName, ...props },
  ref,
) {
  return (
    <PrimitiveCursor.Provider
      {...props}
      ref={ref}
      cursor={cursor === undefined ? <Visual size={size} /> : cursor}
      data-size={size}
      hotspot={
        hotspot ??
        (cursor === undefined
          ? { x: (5 * visualSizes[size]) / 24, y: (3 * visualSizes[size]) / 24 }
          : { x: 0, y: 0 })
      }
      className={[styles.scope, className].filter(Boolean).join(' ')}
      visualClassName={[styles.visual, visualClassName].filter(Boolean).join(' ')}
    />
  );
});
const Follower = forwardRef<HTMLDivElement, CursorFollowerProps>(function CursorFollower(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveCursor.Follower
      {...props}
      ref={ref}
      className={[styles.follower, className].filter(Boolean).join(' ')}
    />
  );
});
export const Cursor = { Provider, Visual, Follower, usePointer: PrimitiveCursor.usePointer };
