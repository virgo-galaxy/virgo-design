/* This file is generated from icons/cursor-arrow.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type CursorArrowIconProps = IconProps;

export const CursorArrowIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, CursorArrowIconProps>(
  function CursorArrowIcon({ size = 24, ...props }: CursorArrowIconProps, ref) {
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
            'M4.75 4.15C4.65 3.28 5.56 2.67 6.32 3.1L19.54 10.96C20.38 11.44 20.23 12.6 19.29 12.87L15.14 14.25C14.77 14.35 14.61 14.55 14.84 14.95L16.81 18.36Q17.29 19.19 16.46 19.67L15.46 20.24Q14.63 20.72 14.15 19.89L12.24 16.58C12.01 16.18 11.68 16.24 11.4 16.5L8.03 19.38C7.35 20.03 6.3 19.66 6.22 18.73L4.75 4.15Z'
          }
        />
      </svg>
    );
  },
);
CursorArrowIcon.displayName = 'CursorArrowIcon';
