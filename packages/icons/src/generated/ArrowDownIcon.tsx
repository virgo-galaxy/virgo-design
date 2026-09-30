/* This file is generated from icons/arrow-down.svg by scripts/generate.ts. Do not edit. */
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
    d: 'M4.75 13.25 L4.75 12.25 L5.25 11.75 L6.25 11.75 L11 17 L11 3.5 L11.5 3 L12.5 3 L13 3.5 L13 17 L17.75 11.75 L18.75 11.75 L19.25 12.25 L19.25 13.25 L12.75 20.5 L11.25 20.5z',
  },
] as const;

export type ArrowDownIconProps = IconProps & { animated?: IconAnimation };

export const ArrowDownIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ArrowDownIconProps>(
  function ArrowDownIcon({ size = 24, animated, ...props }: ArrowDownIconProps, ref) {
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
                'M4.75 13.25 L4.75 12.25 L5.25 11.75 L6.25 11.75 L11 17 L11 3.5 L11.5 3 L12.5 3 L13 3.5 L13 17 L17.75 11.75 L18.75 11.75 L19.25 12.25 L19.25 13.25 L12.75 20.5 L11.25 20.5z'
              }
            />
          </>
        )}
      </svg>
    );
  },
);
ArrowDownIcon.displayName = 'ArrowDownIcon';
