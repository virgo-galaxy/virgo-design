/* This file is generated from icons/grip.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type GripIconProps = IconProps;

export const GripIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, GripIconProps>(function GripIcon(
  { size = 24, ...props }: GripIconProps,
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
      <path d={'M10 6 9 7.732 7 7.732 6 6 7 4.268 9 4.268Z'} />
      <path d={'M18 6 17 7.732 15 7.732 14 6 15 4.268 17 4.268Z'} />
      <path d={'M10 12 9 13.732 7 13.732 6 12 7 10.268 9 10.268Z'} />
      <path d={'M18 12 17 13.732 15 13.732 14 12 15 10.268 17 10.268Z'} />
      <path d={'M10 18 9 19.732 7 19.732 6 18 7 16.268 9 16.268Z'} />
      <path d={'M18 18 17 19.732 15 19.732 14 18 15 16.268 17 16.268Z'} />
    </svg>
  );
});
GripIcon.displayName = 'GripIcon';
