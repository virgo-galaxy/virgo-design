/* This file is generated from icons/home-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type HomeFilledIconProps = IconProps;

export const HomeFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, HomeFilledIconProps>(
  function HomeFilledIcon({ size = 24, ...props }: HomeFilledIconProps, ref) {
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
            'M11.5 3.5h1L21 11.25v1l-.75.75H19v6.5l-1 1H6l-1-1V13H3.75L3 12.25v-1z M9 12.5v8h6v-8z'
          }
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
HomeFilledIcon.displayName = 'HomeFilledIcon';
