/* This file is generated from icons/plus.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type PlusIconProps = IconProps;

export const PlusIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, PlusIconProps>(function PlusIcon(
  { size = 24, ...props }: PlusIconProps,
  ref,
) {
  return (
    <svg
      ref={ref}
      aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true}
      {...props}
      fill="currentColor"
      height={size}
      stroke="none"
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d={'M11.5 3.5h1l.5 .5v7h7l.5 .5v1l-.5 .5h-7v7l-.5 .5h-1l-.5-.5v-7H4l-.5-.5v-1l.5-.5h7V4z'}
      />
    </svg>
  );
});
PlusIcon.displayName = 'PlusIcon';
