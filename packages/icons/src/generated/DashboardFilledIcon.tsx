/* This file is generated from icons/dashboard-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type DashboardFilledIconProps = IconProps;

export const DashboardFilledIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  DashboardFilledIconProps
>(function DashboardFilledIcon({ size = 24, ...props }: DashboardFilledIconProps, ref) {
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
        d={'M4 3.5h6l.5.5v10l-.5.5H4l-.5-.5V4z M14 9.5h6l.5.5v10l-.5.5h-6l-.5-.5V10z'}
        fillRule="evenodd"
      />
      <path
        d={'M14 3.5h6l.5.5v2.5L20 7h-6l-.5-.5V4z M4 17h6l.5.5V20l-.5.5H4l-.5-.5v-2.5z'}
        fillRule="evenodd"
      />
    </svg>
  );
});
DashboardFilledIcon.displayName = 'DashboardFilledIcon';
