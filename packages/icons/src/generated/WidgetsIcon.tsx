/* This file is generated from icons/widgets.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type WidgetsIconProps = IconProps;

export const WidgetsIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, WidgetsIconProps>(
  function WidgetsIcon({ size = 24, ...props }: WidgetsIconProps, ref) {
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
        <path d={'M3 2.5h7l.5.5v7l-.5.5H3l-.5-.5V3z M4 4v5h5V4z'} fillRule="evenodd" />
        <path
          d={
            'M16.4 1.6h.7l4.3 4.3v.7l-4.3 4.3h-.7L12.1 6.6v-.7z M16.75 3.4l-2.85 2.85 2.85 2.85 2.85-2.85z'
          }
          fillRule="evenodd"
        />
        <path d={'M3 12.5h7l.5.5v7l-.5.5H3l-.5-.5v-7z M4 14v5h5v-5z'} fillRule="evenodd" />
        <path d={'M13 12.5h7l.5.5v7l-.5.5h-7l-.5-.5v-7z M14 14v5h5v-5z'} fillRule="evenodd" />
      </svg>
    );
  },
);
WidgetsIcon.displayName = 'WidgetsIcon';
