/* This file is generated from icons/user-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type UserFilledIconProps = IconProps;

export const UserFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, UserFilledIconProps>(
  function UserFilledIcon({ size = 24, ...props }: UserFilledIconProps, ref) {
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
        <path d={'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z'} fillRule="evenodd" />
        <path d={'M4 20v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2l-1 1H5z'} fillRule="evenodd" />
      </svg>
    );
  },
);
UserFilledIcon.displayName = 'UserFilledIcon';
