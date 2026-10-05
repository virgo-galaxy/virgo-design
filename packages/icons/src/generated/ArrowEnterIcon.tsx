/* This file is generated from icons/arrow-enter.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type ArrowEnterIconProps = IconProps;

export const ArrowEnterIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ArrowEnterIconProps>(
  function ArrowEnterIcon({ size = 24, ...props }: ArrowEnterIconProps, ref) {
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
            'M3 16L9 10V15H14.5C17.8 15 19.5 13.3 19.5 10.5S17.8 6 14.5 6H14V4H14.5C19 4 21.5 6.5 21.5 10.5S19 17 14.5 17H9V22Z'
          }
        />
      </svg>
    );
  },
);
ArrowEnterIcon.displayName = 'ArrowEnterIcon';
