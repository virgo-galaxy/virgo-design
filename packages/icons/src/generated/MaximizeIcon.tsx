/* This file is generated from icons/maximize.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type MaximizeIconProps = IconProps;

export const MaximizeIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, MaximizeIconProps>(
  function MaximizeIcon({ size = 24, ...props }: MaximizeIconProps, ref) {
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
            'M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v12h12V6H6Z'
          }
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
MaximizeIcon.displayName = 'MaximizeIcon';
