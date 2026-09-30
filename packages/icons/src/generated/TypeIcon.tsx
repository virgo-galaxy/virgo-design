/* This file is generated from icons/type.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type TypeIconProps = IconProps;

export const TypeIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, TypeIconProps>(function TypeIcon(
  { size = 24, ...props }: TypeIconProps,
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
      <path
        d={
          'M4 3.5h16l.5.5v4l-.5.5h-1l-.5-.5V5.5H13v13h2.5l.5.5v1l-.5.5h-7L8 20v-1l.5-.5H11v-13H5.5V8l-.5.5H4L3.5 8V4z'
        }
      />
    </svg>
  );
});
TypeIcon.displayName = 'TypeIcon';
