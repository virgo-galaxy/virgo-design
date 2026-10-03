/* This file is generated from icons/palette-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type PaletteFilledIconProps = IconProps;

export const PaletteFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, PaletteFilledIconProps>(
  function PaletteFilledIcon({ size = 24, ...props }: PaletteFilledIconProps, ref) {
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
            'M12 2a10 10 0 0 0 0 20h1a3 3 0 0 0 2.4-4.8l-.6-.8a.25.25 0 0 1 .2-.4h2a5 5 0 0 0 5-5c0-5-4.5-9-10-9z M10.5 5.5h2l.5.5v2l-.5.5h-2L10 8V6z M6 8h2l.5.5v2l-.5.5H6l-.5-.5v-2z M6 13h2l.5.5v2L8 16H6l-.5-.5v-2z M15 7.5h2l.5.5v2l-.5.5h-2l-.5-.5V8z'
          }
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
PaletteFilledIcon.displayName = 'PaletteFilledIcon';
