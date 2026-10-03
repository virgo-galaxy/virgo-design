/* This file is generated from icons/play-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type PlayFilledIconProps = IconProps;

export const PlayFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, PlayFilledIconProps>(
  function PlayFilledIcon({ size = 24, ...props }: PlayFilledIconProps, ref) {
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
        <path d={'M8 4.25h1l11 7.25v1L9 19.75H8l-.5-.5v-14z'} />
      </svg>
    );
  },
);
PlayFilledIcon.displayName = 'PlayFilledIcon';
