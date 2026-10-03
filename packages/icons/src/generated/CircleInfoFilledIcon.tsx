/* This file is generated from icons/circle-info-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type CircleInfoFilledIconProps = IconProps;

export const CircleInfoFilledIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  CircleInfoFilledIconProps
>(function CircleInfoFilledIcon({ size = 24, ...props }: CircleInfoFilledIconProps, ref) {
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
          'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M11.5 7h1l.5.5v1l-.5.5h-1l-.5-.5v-1zM11.5 11h1l.5.5v5l-.5.5h-1l-.5-.5v-5z'
        }
        fillRule="evenodd"
      />
    </svg>
  );
});
CircleInfoFilledIcon.displayName = 'CircleInfoFilledIcon';
