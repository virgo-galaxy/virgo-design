/* This file is generated from icons/align-center.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type AlignCenterIconProps = IconProps;

export const AlignCenterIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, AlignCenterIconProps>(
  function AlignCenterIcon({ size = 24, ...props }: AlignCenterIconProps, ref) {
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
            'M4.5 4H19.5l.5.5v1l-.5.5H4.5l-.5-.5v-1z M7.5 9H16.5l.5.5v1l-.5.5H7.5l-.5-.5v-1z M4.5 14H19.5l.5.5v1l-.5.5H4.5l-.5-.5v-1z M7.5 19H16.5l.5.5v1l-.5.5H7.5l-.5-.5v-1z'
          }
        />
      </svg>
    );
  },
);
AlignCenterIcon.displayName = 'AlignCenterIcon';
