/* This file is generated from icons/spline.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type SplineIconProps = IconProps;

export const SplineIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, SplineIconProps>(
  function SplineIcon({ size = 24, ...props }: SplineIconProps, ref) {
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
            'M7.5 18H16a2.25 2.25 0 0 0 0-4.5H8A4.25 4.25 0 0 1 8 5h8.5v2H8a2.25 2.25 0 0 0 0 4.5h8a4.25 4.25 0 0 1 0 8.5H7.5z'
          }
        />
        <path
          d={
            'M16.5 3h5l.5.5v5l-.5.5h-5l-.5-.5v-5z M18 5v2h2V5z M2.5 16h5l.5.5v5l-.5.5h-5l-.5-.5v-5z M4 18v2h2v-2z'
          }
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
SplineIcon.displayName = 'SplineIcon';
