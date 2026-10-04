/* This file is generated from icons/arrow-up.svg by scripts/generate.ts. Do not edit. */
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
      values: ['0 0', '0 -2.5', '0 0.5', '0 0', '0 0'],
      times: [0, 0.28, 0.52, 0.72, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M19.25 10.75 L19.25 11.75 L18.75 12.25 L17.75 12.25 L13 7 L13 20.5 L12.5 21 L11.5 21 L11 20.5 L11 7 L6.25 12.25 L5.25 12.25 L4.75 11.75 L4.75 10.75 L11.25 3.5 L12.75 3.5z',
  },
] as const;

export type ArrowUpIconProps = IconProps & { animated?: IconAnimation };

export const ArrowUpIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ArrowUpIconProps>(
  function ArrowUpIcon({ size = 24, animated, ...props }: ArrowUpIconProps, ref) {
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
                'M19.25 10.75 L19.25 11.75 L18.75 12.25 L17.75 12.25 L13 7 L13 20.5 L12.5 21 L11.5 21 L11 20.5 L11 7 L6.25 12.25 L5.25 12.25 L4.75 11.75 L4.75 10.75 L11.25 3.5 L12.75 3.5z'
              }
            />
          </>
        )}
      </svg>
    );
  },
);
ArrowUpIcon.displayName = 'ArrowUpIcon';
