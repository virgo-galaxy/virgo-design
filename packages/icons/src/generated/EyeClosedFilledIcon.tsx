/* This file is generated from icons/eye-closed-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type EyeClosedFilledIconProps = IconProps;

export const EyeClosedFilledIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  EyeClosedFilledIconProps
>(function EyeClosedFilledIcon({ size = 24, ...props }: EyeClosedFilledIconProps, ref) {
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
          'M2 10 3.5 8.5C5.75 10.75 8.25 11.5 12 11.5s6.25-.75 8.5-3L22 10c-2.5 4-5.5 6-10 6S4.5 14 2 10Z'
        }
        fillRule="evenodd"
      />
      <path
        d={
          'm5 12 1.5 1.5-2.25 3H3.5l-.75-.75v-.5z M11 15h2v3.5l-.5.5h-1l-.5-.5z M19 12l2.25 3.25v.5l-.75.75h-.75l-2.25-3z'
        }
        fillRule="evenodd"
      />
    </svg>
  );
});
EyeClosedFilledIcon.displayName = 'EyeClosedFilledIcon';
