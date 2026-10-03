/* This file is generated from icons/triangle-alert-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type TriangleAlertFilledIconProps = IconProps;

export const TriangleAlertFilledIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  TriangleAlertFilledIconProps
>(function TriangleAlertFilledIcon({ size = 24, ...props }: TriangleAlertFilledIconProps, ref) {
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
          'M11.5 3h1L22 19.5 21 21H3l-1-1.5L11.5 3Z M11.5 10h1l.5.5v4l-.5.5h-1l-.5-.5v-4zM11.5 16.5h1l.5.5v.5l-.5.5h-1L11 17.5V17z'
        }
        fillRule="evenodd"
      />
    </svg>
  );
});
TriangleAlertFilledIcon.displayName = 'TriangleAlertFilledIcon';
