/* This file is generated from icons/resize-corner-bottom-right.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type ResizeCornerBottomRightIconProps = IconProps;

export const ResizeCornerBottomRightIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  ResizeCornerBottomRightIconProps
>(function ResizeCornerBottomRightIcon(
  { size = 24, ...props }: ResizeCornerBottomRightIconProps,
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
      <path d={'M18 6H20V19L19 20H6V18H18Z'} />
      <path d={'M12 6H14V13L13 14H6V12H12Z'} />
    </svg>
  );
});
ResizeCornerBottomRightIcon.displayName = 'ResizeCornerBottomRightIcon';
