/* This file is generated from icons/chevrons-up.svg by scripts/generate.ts. Do not edit. */
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
      values: ['0 0', '0 -1.8', '0 0.36', '0 0', '0 0'],
      times: [0, 0.3, 0.5, 0.7, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M19.25 19.75h-1l-6-6h-.5l-6 6h-1l-.5-.5v-1l7.05-7.05h1.4l7.05 7.05v1z M19.25 12.75h-1l-6-6h-.5l-6 6h-1l-.5-.5v-1L11.3 4.2h1.4l7.05 7.05v1z',
  },
] as const;

export type ChevronsUpIconProps = Omit<
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

export const ChevronsUpIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ChevronsUpIconProps>(
  function ChevronsUpIcon({ size = 24, animated, ...props }: ChevronsUpIconProps, ref) {
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
                'M19.25 19.75h-1l-6-6h-.5l-6 6h-1l-.5-.5v-1l7.05-7.05h1.4l7.05 7.05v1z M19.25 12.75h-1l-6-6h-.5l-6 6h-1l-.5-.5v-1L11.3 4.2h1.4l7.05 7.05v1z'
              }
            />
          </>
        )}
      </svg>
    );
  },
);
ChevronsUpIcon.displayName = 'ChevronsUpIcon';
