/* This file is generated from icons/move.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type MoveIconProps = IconProps;

export const MoveIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, MoveIconProps>(function MoveIcon(
  { size = 24, ...props }: MoveIconProps,
  ref,
) {
  return (
    <svg
      ref={ref}
      aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true}
      {...props}
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d={
          'M11.5 2.5h1L16 6v1l-.5.5h-1L13 6v5h5l-1.5-1.5v-1L17 8h1l3.5 3.5v1L18 16h-1l-.5-.5v-1L18 13h-5v5l1.5-1.5h1l.5.5v1l-3.5 3.5h-1L8 18v-1l.5-.5h1L11 18v-5H6l1.5 1.5v1L7 16H6l-3.5-3.5v-1L6 8h1l.5.5v1L6 11h5V6L9.5 7.5h-1L8 7V6z'
        }
      />
    </svg>
  );
});
MoveIcon.displayName = 'MoveIcon';
