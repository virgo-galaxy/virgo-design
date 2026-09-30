/* This file is generated from icons/moon.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';

const animation = {
  duration: 1600,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'rotate',
      values: ['0 12 12', '-12 12 12', '12 12 12', '0 12 12', '0 12 12'],
      times: [0, 0.25, 0.5, 0.8, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M8.648 3.648A9 9 0 1 0 20.352 15.352 9 9 0 0 1 8.648 3.648Z M6.074 8.274A7 7 0 0 0 15.726 17.926 11 11 0 0 1 6.074 8.274Z',
    fillRule: 'evenodd',
  },
] as const;

export type MoonIconProps = Omit<
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

export const MoonIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, MoonIconProps>(function MoonIcon(
  { size = 24, animated, ...props }: MoonIconProps,
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
              'M8.648 3.648A9 9 0 1 0 20.352 15.352 9 9 0 0 1 8.648 3.648Z M6.074 8.274A7 7 0 0 0 15.726 17.926 11 11 0 0 1 6.074 8.274Z'
            }
            fillRule="evenodd"
          />
        </>
      )}
    </svg>
  );
});
MoonIcon.displayName = 'MoonIcon';
