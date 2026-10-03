/* This file is generated from icons/circle-check-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type CircleCheckFilledIconProps = IconProps;

export const CircleCheckFilledIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  CircleCheckFilledIconProps
>(function CircleCheckFilledIcon({ size = 24, ...props }: CircleCheckFilledIconProps, ref) {
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
          'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M7 11h.5l3 3 5.5-5.5h.5l1 1v.5l-6.5 6.5h-1L6 12.5V12z'
        }
        fillRule="evenodd"
      />
    </svg>
  );
});
CircleCheckFilledIcon.displayName = 'CircleCheckFilledIcon';
