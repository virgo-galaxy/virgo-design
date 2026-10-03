/* This file is generated from icons/unpin-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type UnpinFilledIconProps = IconProps;

export const UnpinFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, UnpinFilledIconProps>(
  function UnpinFilledIcon({ size = 24, ...props }: UnpinFilledIconProps, ref) {
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
            'M13.96 16.36 12.362 16.107 11.658 20.552 10.514 21.383 9.683 20.239 10.387 15.794 6.436 15.169 5.605 14.024 5.761 13.037 8.585 10.985Z M9.457 2.485 17.359 3.737 18.19 4.881 18.033 5.868 15.745 7.531 15.119 11.482 17.613 14.914 17.572 15.172 9.706 7.306 9.819 6.592 8.157 4.304 8.313 3.316Z'
          }
          fillRule="evenodd"
        />
        <path d={'M4 3h.5L21 19.5v.5L20 21h-.5L3 4.5V4z'} fillRule="evenodd" />
      </svg>
    );
  },
);
UnpinFilledIcon.displayName = 'UnpinFilledIcon';
