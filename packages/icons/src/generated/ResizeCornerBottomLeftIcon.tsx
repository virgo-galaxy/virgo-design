/* This file is generated from icons/resize-corner-bottom-left.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type ResizeCornerBottomLeftIconProps = IconProps;

export const ResizeCornerBottomLeftIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  ResizeCornerBottomLeftIconProps
>(function ResizeCornerBottomLeftIcon(
  { size = 24, ...props }: ResizeCornerBottomLeftIconProps,
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
      <path d={'M6 6H4V19L5 20H18V18H6Z'} />
      <path d={'M12 6H10V13L11 14H18V12H12Z'} />
    </svg>
  );
});
ResizeCornerBottomLeftIcon.displayName = 'ResizeCornerBottomLeftIcon';
