/* This file is generated from icons/layout-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type LayoutFilledIconProps = IconProps;

export const LayoutFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, LayoutFilledIconProps>(
  function LayoutFilledIcon({ size = 24, ...props }: LayoutFilledIconProps, ref) {
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
          d={'M4.5 4.5h15l1 1v13l-1 1h-15l-1-1v-13z M5.25 8h13.5v1.5H5.25z M8.5 9.5H10v8.25H8.5z'}
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
LayoutFilledIcon.displayName = 'LayoutFilledIcon';
