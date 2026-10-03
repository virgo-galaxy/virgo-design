/* This file is generated from icons/database.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type DatabaseIconProps = IconProps;

export const DatabaseIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, DatabaseIconProps>(
  function DatabaseIcon({ size = 24, ...props }: DatabaseIconProps, ref) {
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
            'M12 2.5C7 2.5 3 3.8 3 6v12c0 2.2 4 3.5 9 3.5s9-1.3 9-3.5V6c0-2.2-4-3.5-9-3.5z M12 4.5c4.1 0 7 .8 7 1.5s-2.9 1.5-7 1.5S5 6.7 5 6s2.9-1.5 7-1.5z M5 8.4C6.7 9.1 9.2 9.5 12 9.5s5.3-.4 7-1.1V12c0 .7-2.9 1.5-7 1.5S5 12.7 5 12z M5 14.4c1.7 .7 4.2 1.1 7 1.1s5.3-.4 7-1.1V18c0 .7-2.9 1.5-7 1.5S5 18.7 5 18z'
          }
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
DatabaseIcon.displayName = 'DatabaseIcon';
