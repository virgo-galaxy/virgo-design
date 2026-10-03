/* This file is generated from icons/pause.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type PauseIconProps = IconProps;

export const PauseIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, PauseIconProps>(
  function PauseIcon({ size = 24, ...props }: PauseIconProps, ref) {
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
            'M6.25 4.5h3.5l.5.5v14l-.5.5h-3.5l-.5-.5V5z M14.25 4.5h3.5l.5.5v14l-.5.5h-3.5l-.5-.5V5z M7.25 6v12h1.5V6z M15.25 6v12h1.5V6z'
          }
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
PauseIcon.displayName = 'PauseIcon';
