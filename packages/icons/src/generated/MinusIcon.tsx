/* This file is generated from icons/minus.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type MinusIconProps = IconProps;

export const MinusIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, MinusIconProps>(
  function MinusIcon({ size = 24, ...props }: MinusIconProps, ref) {
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
        <path d={'M4 11h16l.5 .5v1l-.5 .5H4l-.5-.5v-1z'} />
      </svg>
    );
  },
);
MinusIcon.displayName = 'MinusIcon';
