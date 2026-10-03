/* This file is generated from icons/briefcase-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type BriefcaseFilledIconProps = IconProps;

export const BriefcaseFilledIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  BriefcaseFilledIconProps
>(function BriefcaseFilledIcon({ size = 24, ...props }: BriefcaseFilledIconProps, ref) {
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
      <path d={'M8 7.5V4l1-1h6l1 1v3.5h-2V5h-4v2.5z'} fillRule="evenodd" />
      <path
        d={'M3 7.5h18l1 1v11l-1 1H3l-1-1v-11z M4 12.5h6v-1h4v1h6v2h-6v1h-4v-1H4z'}
        fillRule="evenodd"
      />
    </svg>
  );
});
BriefcaseFilledIcon.displayName = 'BriefcaseFilledIcon';
