/* This file is generated from icons/gender-male.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type GenderMaleIconProps = IconProps;

export const GenderMaleIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, GenderMaleIconProps>(
  function GenderMaleIcon({ size = 24, ...props }: GenderMaleIconProps, ref) {
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
            'M8.5 8a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z'
          }
          fillRule="evenodd"
        />
        <path
          d={
            'M15.5 2.5h5.65l.35.35V8.5l-.35.35H19.5V5.91l-5.75 5.75-1.41-1.41 5.75-5.75H15.5l-.35-.35V2.85Z'
          }
        />
      </svg>
    );
  },
);
GenderMaleIcon.displayName = 'GenderMaleIcon';
