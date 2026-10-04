/* This file is generated from icons/filter-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type FilterFilledIconProps = IconProps;

export const FilterFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, FilterFilledIconProps>(
  function FilterFilledIcon({ size = 24, ...props }: FilterFilledIconProps, ref) {
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
        <path d={'M4 4h16l.5.5V6L14 13.5V19l-.5.5h-3L10 19v-5.5L3.5 6V4.5z'} />
      </svg>
    );
  },
);
FilterFilledIcon.displayName = 'FilterFilledIcon';
