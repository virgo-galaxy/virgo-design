/* This file is generated from icons/arrow-right.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 900,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '2.5 0', '-0.5 0', '0 0', '0 0'],
      times: [0, 0.28, 0.52, 0.72, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M13.25 19.25 L12.25 19.25 L11.75 18.75 L11.75 17.75 L17 13 L3.5 13 L3 12.5 L3 11.5 L3.5 11 L17 11 L11.75 6.25 L11.75 5.25 L12.25 4.75 L13.25 4.75 L20.5 11.25 L20.5 12.75z',
  },
] as const;

export type ArrowRightIconProps = IconProps & { animated?: IconAnimation };

export const ArrowRightIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ArrowRightIconProps>(
  function ArrowRightIcon({ size = 24, animated, ...props }: ArrowRightIconProps, ref) {
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
                'M13.25 19.25 L12.25 19.25 L11.75 18.75 L11.75 17.75 L17 13 L3.5 13 L3 12.5 L3 11.5 L3.5 11 L17 11 L11.75 6.25 L11.75 5.25 L12.25 4.75 L13.25 4.75 L20.5 11.25 L20.5 12.75z'
              }
            />
          </>
        )}
      </svg>
    );
  },
);
ArrowRightIcon.displayName = 'ArrowRightIcon';
