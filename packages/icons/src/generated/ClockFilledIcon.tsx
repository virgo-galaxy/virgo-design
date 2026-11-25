/* This file is generated from icons/clock-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type ClockFilledIconProps = IconProps;

export const ClockFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ClockFilledIconProps>(
  function ClockFilledIcon({ size = 24, ...props }: ClockFilledIconProps, ref) {
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
            'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M11.5 7h1l.5.5V11h3.5l.5.5v1l-.5.5h-5l-.5-.5v-5z'
          }
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
ClockFilledIcon.displayName = 'ClockFilledIcon';
