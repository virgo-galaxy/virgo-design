/* This file is generated from icons/reset.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type ResetIconProps = IconProps;

export const ResetIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ResetIconProps>(
  function ResetIcon({ size = 24, ...props }: ResetIconProps, ref) {
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
            'M4.88 7.35a8.5 8.5 0 1 1-1.13 6.71l1.94-.48a6.5 6.5 0 1 0 .89-5.16L8.5 10.5H2.75V4.75z'
          }
        />
      </svg>
    );
  },
);
ResetIcon.displayName = 'ResetIcon';
