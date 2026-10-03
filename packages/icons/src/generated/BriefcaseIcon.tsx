/* This file is generated from icons/briefcase.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type BriefcaseIconProps = IconProps;

export const BriefcaseIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, BriefcaseIconProps>(
  function BriefcaseIcon({ size = 24, ...props }: BriefcaseIconProps, ref) {
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
        <path d={'M8 7.5V4l1-1h6l1 1v3.5h-2V5h-4v2.5z'} />
        <path
          d={
            'M3 7.5h18l1 1v11l-1 1H3l-1-1v-11z M4 9.5v3h6v-1h4v1h6v-3z M4 14.5v4h16v-4h-6v1h-4v-1z'
          }
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
BriefcaseIcon.displayName = 'BriefcaseIcon';
