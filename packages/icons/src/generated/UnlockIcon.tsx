/* This file is generated from icons/unlock.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type UnlockIconProps = IconProps;

export const UnlockIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, UnlockIconProps>(
  function UnlockIcon({ size = 24, ...props }: UnlockIconProps, ref) {
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
        <path d={'M7 9.5v-4L9.5 3h5L17 5.5V7l-.5.5h-1L15 7v-.5L13.5 5h-3L9 6.5v3z'} />
        <path
          d={'M5.5 9.5h13l1 1v9l-1 1h-13l-1-1v-9z M7 11.5l-.5.5v6l.5.5h10l.5-.5v-6l-.5-.5z'}
          fillRule="evenodd"
        />
        <path d={'M11.5 13h1l.5.5v3l-.5.5h-1l-.5-.5v-3z'} />
      </svg>
    );
  },
);
UnlockIcon.displayName = 'UnlockIcon';
