/* This file is generated from icons/cloud-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type CloudFilledIconProps = IconProps;

export const CloudFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, CloudFilledIconProps>(
  function CloudFilledIcon({ size = 24, ...props }: CloudFilledIconProps, ref) {
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
            'M4.5 19 2 16.5v-3.25l2.5-2.5H7L8.25 7.5 11 4.75h4.25L18 7.5l1 2.75h1l2 2v4.25L19.5 19z'
          }
        />
      </svg>
    );
  },
);
CloudFilledIcon.displayName = 'CloudFilledIcon';
