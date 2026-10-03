/* This file is generated from icons/stop-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type StopFilledIconProps = IconProps;

export const StopFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, StopFilledIconProps>(
  function StopFilledIcon({ size = 24, ...props }: StopFilledIconProps, ref) {
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
        <path d={'M6 5h12l1 1v12l-1 1H6l-1-1V6z'} />
      </svg>
    );
  },
);
StopFilledIcon.displayName = 'StopFilledIcon';
