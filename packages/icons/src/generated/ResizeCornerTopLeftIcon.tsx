/* This file is generated from icons/resize-corner-top-left.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type ResizeCornerTopLeftIconProps = IconProps;

export const ResizeCornerTopLeftIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  ResizeCornerTopLeftIconProps
>(function ResizeCornerTopLeftIcon({ size = 24, ...props }: ResizeCornerTopLeftIconProps, ref) {
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
      <path d={'M6 18H4V5L5 4H18V6H6Z'} />
      <path d={'M12 18H10V11L11 10H18V12H12Z'} />
    </svg>
  );
});
ResizeCornerTopLeftIcon.displayName = 'ResizeCornerTopLeftIcon';
