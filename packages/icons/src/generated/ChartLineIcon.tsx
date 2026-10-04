/* This file is generated from icons/chart-line.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type ChartLineIconProps = IconProps;

export const ChartLineIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ChartLineIconProps>(
  function ChartLineIcon({ size = 24, ...props }: ChartLineIconProps, ref) {
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
        <path d={'M3.5 3.5h1.25l.5.5v14.75H20l.5.5v1.25H4l-.5-.5z'} />
        <path
          d={'M6.25 13.5 10 9.75h1l3 3 5.25-6.25H20l.75.75V8l-6.25 7.25h-1l-3-3-3 3h-.75l-.5-.5z'}
        />
      </svg>
    );
  },
);
ChartLineIcon.displayName = 'ChartLineIcon';
