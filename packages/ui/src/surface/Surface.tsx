import { type CSSProperties, forwardRef } from 'react';

import styles from './Surface.module.scss';
import type { SurfaceBackground, SurfaceProps } from './Surface.types';

type SurfaceStyle = CSSProperties & {
  '--surface-tone': string;
  '--surface-radius': string;
  '--surface-elevation': string;
};

function getBackgroundStyle(background: SurfaceBackground): CSSProperties {
  if (background.type === 'color') {
    return { backgroundColor: background.value };
  }

  if (background.type === 'gradient') {
    return { backgroundImage: background.value };
  }

  // Escape a CSS string, including quotes and line breaks, without interpreting the URL.
  const source = background.src.replace(
    /["\\\n\r\f]/g,
    (character) => `\\${character.charCodeAt(0).toString(16)} `,
  );

  return {
    backgroundImage: `url("${source}")`,
    backgroundSize: background.fit ?? 'cover',
    backgroundPosition: background.position ?? 'center',
    backgroundRepeat: 'no-repeat',
  };
}

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(function Surface(
  {
    tone = 'default',
    material = 'solid',
    background,
    elevation = 0,
    radius = 0,
    border = material === 'glass' ? 'subtle' : 'none',
    children,
    className,
    style,
    ...props
  },
  forwardedRef,
) {
  const surfaceStyle: SurfaceStyle = {
    '--surface-tone': `var(--vd-surface-${tone})`,
    '--surface-radius': `var(--vd-radius-${radius})`,
    '--surface-elevation': `var(--vd-elevation-${elevation})`,
    ...style,
  };

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={surfaceStyle}
      data-tone={tone}
      data-material={material}
      data-elevation={elevation}
      data-radius={radius}
      data-border={border}
    >
      {background ? (
        <span
          aria-hidden="true"
          className={styles.background}
          data-slot="background"
          style={getBackgroundStyle(background)}
        />
      ) : null}
      {material !== 'solid' ? (
        <span aria-hidden="true" className={styles.material} data-slot="material" />
      ) : null}
      {children}
    </div>
  );
});

Surface.displayName = 'Surface';
