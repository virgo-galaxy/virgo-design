/* This file is generated from icons/users.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type UsersIconProps = IconProps;

export const UsersIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, UsersIconProps>(
  function UsersIcon({ size = 24, ...props }: UsersIconProps, ref) {
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
            'M8.5 3.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 1 0 0-7.5z M8.5 5.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 1 1 0-3.5z'
          }
          fillRule="evenodd"
        />
        <path
          d={
            'M16.75 3a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 1 0 0-6.5z M16.75 4.85a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 1 1 0-2.8z'
          }
          fillRule="evenodd"
        />
        <path
          d={
            'M2 20v-1.75a4.75 4.75 0 0 1 4.75-4.75h3.5A4.75 4.75 0 0 1 15 18.25V20l-.5.5h-1L13 20v-1.75a2.75 2.75 0 0 0-2.75-2.75h-3.5A2.75 2.75 0 0 0 4 18.25V20l-.5.5h-1z M14.25 12.25h3A4.75 4.75 0 0 1 22 17v2l-.5.5h-1L20 19v-2a2.75 2.75 0 0 0-2.75-2.75h-1.9l-1.65-1.6z'
          }
        />
      </svg>
    );
  },
);
UsersIcon.displayName = 'UsersIcon';
