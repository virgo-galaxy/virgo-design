/* This file is generated from icons/arrow-left.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1400,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'rotate',
      values: ['0 12 12', '-90 12 12', '0 12 12', '0 12 12'],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M10.75 4.75 L11.75 4.75 L12.25 5.25 L12.25 6.25 L7 11 L20.5 11 L21 11.5 L21 12.5 L20.5 13 L7 13 L12.25 17.75 L12.25 18.75 L11.75 19.25 L10.75 19.25 L3.5 12.75 L3.5 11.25z',
  },
] as const;

export type ArrowLeftIconProps = IconProps & { animated?: IconAnimation };

export const ArrowLeftIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ArrowLeftIconProps>(
  function ArrowLeftIcon({ size = 24, animated, ...props }: ArrowLeftIconProps, ref) {
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
                'M10.75 4.75 L11.75 4.75 L12.25 5.25 L12.25 6.25 L7 11 L20.5 11 L21 11.5 L21 12.5 L20.5 13 L7 13 L12.25 17.75 L12.25 18.75 L11.75 19.25 L10.75 19.25 L3.5 12.75 L3.5 11.25z'
              }
            />
          </>
        )}
      </svg>
    );
  },
);
ArrowLeftIcon.displayName = 'ArrowLeftIcon';
