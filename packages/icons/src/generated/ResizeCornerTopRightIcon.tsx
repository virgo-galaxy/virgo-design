/* This file is generated from icons/resize-corner-top-right.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type ResizeCornerTopRightIconProps = IconProps;

export const ResizeCornerTopRightIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  ResizeCornerTopRightIconProps
>(function ResizeCornerTopRightIcon({ size = 24, ...props }: ResizeCornerTopRightIconProps, ref) {
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
      <path d={'M18 18H20V5L19 4H6V6H18Z'} />
      <path d={'M12 18H14V11L13 10H6V12H12Z'} />
    </svg>
  );
});
ResizeCornerTopRightIcon.displayName = 'ResizeCornerTopRightIcon';
