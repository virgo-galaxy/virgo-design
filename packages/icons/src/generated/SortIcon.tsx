/* This file is generated from icons/sort.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type SortIconProps = IconProps & {
  direction?: 'none' | 'ascending' | 'descending';
  activeColor?: string;
};

export const SortIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, SortIconProps>(function SortIcon(
  { size = 24, direction = 'none', activeColor = 'currentColor', ...props }: SortIconProps,
  ref,
) {
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
        d={'M11.6 3h.8l5.6 7-.3.5H6.3L6 10z'}
        data-slot="sort-ascending"
        fill={direction === 'ascending' ? activeColor : 'currentColor'}
        opacity={direction === 'ascending' ? 1 : 0.65}
      />
      <path
        d={'M6.3 13.5h11.4l.3.5-5.6 7h-.8L6 14z'}
        data-slot="sort-descending"
        fill={direction === 'descending' ? activeColor : 'currentColor'}
        opacity={direction === 'descending' ? 1 : 0.45}
      />
    </svg>
  );
});
SortIcon.displayName = 'SortIcon';
