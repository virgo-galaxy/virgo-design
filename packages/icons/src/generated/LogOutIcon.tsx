/* This file is generated from icons/log-out.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type LogOutIconProps = IconProps;

export const LogOutIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, LogOutIconProps>(
  function LogOutIcon({ size = 24, ...props }: LogOutIconProps, ref) {
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
        <path d={'M5 3h6l.5.5v1l-.5.5H6v14h5l.5.5v1l-.5.5H5l-1-1V4z'} />
        <path
          d={'m17 7 5 5-5 5h-1.4l-.5-.5v-1.4l2.6-2.6H10l-.5-.5v-1l.5-.5h7.7l-2.6-2.6V7.5l.5-.5z'}
        />
      </svg>
    );
  },
);
LogOutIcon.displayName = 'LogOutIcon';
