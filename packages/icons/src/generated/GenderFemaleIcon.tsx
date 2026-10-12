/* This file is generated from icons/gender-female.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type GenderFemaleIconProps = IconProps;

export const GenderFemaleIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, GenderFemaleIconProps>(
  function GenderFemaleIcon({ size = 24, ...props }: GenderFemaleIconProps, ref) {
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
            'M12 2a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z'
          }
          fillRule="evenodd"
        />
        <path
          d={
            'M11 14h2v4h3.65l.35.35v1.3l-.35.35H13v1.65l-.35.35h-1.3l-.35-.35V20H7.35L7 19.65v-1.3l.35-.35H11Z'
          }
        />
      </svg>
    );
  },
);
GenderFemaleIcon.displayName = 'GenderFemaleIcon';
