/* This file is generated from icons/home.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type HomeIconProps = IconProps;

export const HomeIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, HomeIconProps>(function HomeIcon(
  { size = 24, ...props }: HomeIconProps,
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
          'M11.5 3.5h1L21 11.25v1l-.75.75H19v6.5l-1 1H6l-1-1V13H3.75L3 12.25v-1z M12 6 7 10.5v8h2v-6h6v6h2v-8z M11 14.5v6h2v-6z'
        }
        fillRule="evenodd"
      />
    </svg>
  );
});
HomeIcon.displayName = 'HomeIcon';
