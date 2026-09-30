/* This file is generated from icons/chevrons-down.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';

const animation = {
  duration: 1100,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '0 1.8', '0 -0.36', '0 0', '0 0'],
      times: [0, 0.3, 0.5, 0.7, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M4.75 4.25h1l6 6h.5l6-6h1l.5.5v1l-7.05 7.05h-1.4L4.25 5.75v-1z M4.75 11.25h1l6 6h.5l6-6h1l.5.5v1l-7.05 7.05h-1.4L4.25 12.75v-1z',
  },
] as const;

export type ChevronsDownIconProps = Omit<
  SVGProps<SVGSVGElement>,
  | 'stroke'
  | 'strokeLinecap'
  | 'strokeLinejoin'
  | 'strokeWidth'
  | 'viewBox'
  | 'fill'
  | 'width'
  | 'height'
  | 'children'
  | 'ref'
> & {
  size?: number;
  animated?: IconAnimation;
};

export const ChevronsDownIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ChevronsDownIconProps>(
  function ChevronsDownIcon({ size = 24, animated, ...props }: ChevronsDownIconProps, ref) {
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
        {iconAnimationCount(animated) ? (
          <AnimatedPaths
            key={String(animated)}
            paths={animationPaths}
            animation={animation}
            animated={animated!}
          />
        ) : (
          <>
            <path
              d={
                'M4.75 4.25h1l6 6h.5l6-6h1l.5.5v1l-7.05 7.05h-1.4L4.25 5.75v-1z M4.75 11.25h1l6 6h.5l6-6h1l.5.5v1l-7.05 7.05h-1.4L4.25 12.75v-1z'
              }
            />
          </>
        )}
      </svg>
    );
  },
);
ChevronsDownIcon.displayName = 'ChevronsDownIcon';
