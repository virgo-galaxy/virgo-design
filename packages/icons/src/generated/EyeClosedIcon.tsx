/* This file is generated from icons/eye-closed.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type EyeClosedIconProps = IconProps;

export const EyeClosedIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, EyeClosedIconProps>(
  function EyeClosedIcon({ size = 24, ...props }: EyeClosedIconProps, ref) {
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
            'M2 8.25 3.5 6.75 C5.75 10.5 8.25 12.25 12 12.25 s6.25 -1.75 8.5 -5.5 L22 8.25 c-2.5 4 -5.5 6 -10 6 S4.5 12.25 2 8.25 Z'
          }
        />
        <path
          d={
            'm5 10.25 1.5 1.5 -2.25 3 H3.5 l-0.75 -0.75 v-0.5 z M11 13.25 h2 v3.5 l-0.5 0.5 h-1 l-0.5 -0.5 z M19 10.25 l2.25 3.25 v0.5 l-0.75 0.75 h-0.75 l-2.25 -3 z'
          }
        />
      </svg>
    );
  },
);
EyeClosedIcon.displayName = 'EyeClosedIcon';
