/* This file is generated from icons/calendar.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type CalendarIconProps = IconProps;

export const CalendarIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, CalendarIconProps>(
  function CalendarIcon({ size = 24, ...props }: CalendarIconProps, ref) {
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
          d={'M4.5 4.5h15l1 1v14l-1 1h-15l-1-1v-14z M5.5 6.5v2h13v-2z M5.5 10.5v8h13v-8z'}
          fillRule="evenodd"
        />
        <path d={'M7.5 2.5h1l.5.5v4l-.5.5h-1L7 7V3z M15.5 2.5h1l.5.5v4l-.5.5h-1L15 7V3z'} />
        <path
          d={
            'M7 11.5h2v2H7z M11 11.5h2v2h-2z M15 11.5h2v2h-2z M7 15.5h2v2H7z M11 15.5h2v2h-2z M15 15.5h2v2h-2z'
          }
        />
      </svg>
    );
  },
);
CalendarIcon.displayName = 'CalendarIcon';
