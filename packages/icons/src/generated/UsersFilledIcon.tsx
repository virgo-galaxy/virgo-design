/* This file is generated from icons/users-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type UsersFilledIconProps = IconProps;

export const UsersFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, UsersFilledIconProps>(
  function UsersFilledIcon({ size = 24, ...props }: UsersFilledIconProps, ref) {
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
            'M8.5 3.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 1 0 0-7.5z M16.75 3a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 1 0 0-6.5z'
          }
        />
        <path
          d={
            'M2 20v-1.75a4.75 4.75 0 0 1 4.75-4.75h3.5A4.75 4.75 0 0 1 15 18.25V20l-.5.5h-12z M14 12.25h3.25A4.75 4.75 0 0 1 22 17v1.75l-.75.75H17v-1.25c0-2.51-1.1-4.46-3-6z'
          }
        />
      </svg>
    );
  },
);
UsersFilledIcon.displayName = 'UsersFilledIcon';
