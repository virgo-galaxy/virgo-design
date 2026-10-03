/* This file is generated from icons/studio-tools-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type StudioToolsFilledIconProps = IconProps;

export const StudioToolsFilledIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  StudioToolsFilledIconProps
>(function StudioToolsFilledIcon({ size = 24, ...props }: StudioToolsFilledIconProps, ref) {
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
      <path d={'M4 3h10v2H5v14h14v-9h2v10l-1 1H4l-1-1V4z'} fillRule="evenodd" />
      <path d={'M12 7l5 5-5 5-5-5z'} fillRule="evenodd" />
      <path d={'M18 2h2v2h2v2h-2v2h-2V6h-2V4h2z'} fillRule="evenodd" />
    </svg>
  );
});
StudioToolsFilledIcon.displayName = 'StudioToolsFilledIcon';
