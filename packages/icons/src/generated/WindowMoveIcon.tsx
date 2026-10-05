/* This file is generated from icons/window-move.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type WindowMoveIconProps = IconProps;

export const WindowMoveIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, WindowMoveIconProps>(
  function WindowMoveIcon({ size = 24, ...props }: WindowMoveIconProps, ref) {
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
        <path d={'M4 3H18L20 5V10H18V5.75L17.25 5H5.75L5 5.75V17.25L5.75 18H10V20H4L3 19V4Z'} />
        <path
          d={
            'M13.2 11.35 21.05 14.2C22.35 14.68 22.37 16.25 21 16.72L18.35 17.58C17.97 17.7 17.72 17.96 17.6 18.33L16.74 20.99C16.3 22.37 14.7 22.36 14.22 21.06L11.37 13.21C10.86 11.81 11.81 10.84 13.2 11.35Z'
          }
        />
      </svg>
    );
  },
);
WindowMoveIcon.displayName = 'WindowMoveIcon';
