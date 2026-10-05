/* This file is generated from icons/sparkles.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type SparklesIconProps = IconProps;

export const SparklesIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, SparklesIconProps>(
  function SparklesIcon({ size = 24, ...props }: SparklesIconProps, ref) {
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
            'M10.5 3 13 9l6 2.5-6 2.5-2.5 6L8 14l-6-2.5L8 9Zm0 4.8-1.3 3.1-3.1 1.3 3.1 1.3 1.3 3.1 1.3-3.1 3.1-1.3-3.1-1.3Z'
          }
          fillRule="evenodd"
        />
        <path
          d={
            'm19 1 1.1 2.9L23 5l-2.9 1.1L19 9l-1.1-2.9L15 5l2.9-1.1ZM20 16l.9 2.1 2.1.9-2.1.9L20 22l-.9-2.1L17 19l2.1-.9Z'
          }
        />
      </svg>
    );
  },
);
SparklesIcon.displayName = 'SparklesIcon';
