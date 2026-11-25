/* This file is generated from icons/windows.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type WindowsIconProps = IconProps;

export const WindowsIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, WindowsIconProps>(
  function WindowsIcon({ size = 24, ...props }: WindowsIconProps, ref) {
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
            'M2 4.75L10.2 3.63L10.2 11.54L2 11.54z M2 12.55L10.2 12.55L10.2 20.38L2 19.25z M11.1 3.5L22 2L22 11.54L11.1 11.54z M11.1 12.55L22 12.55L22 22L11.1 20.5z'
          }
        />
      </svg>
    );
  },
);
WindowsIcon.displayName = 'WindowsIcon';
