/* This file is generated from icons/bell-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1200,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'rotate',
      values: ['0 12 4', '-12 12 4', '12 12 4', '0 12 4'],
    },
    {
      path: 1,
      attribute: 'transform',
      transform: 'rotate',
      values: ['0 12 4', '-12 12 4', '12 12 4', '0 12 4'],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M11 2h2v2.1A6 6 0 0 1 18 10v4.5l2 2v2L19.5 19h-15l-.5-.5v-2l2-2V10a6 6 0 0 1 5-5.9z',
    fillRule: 'evenodd',
  },
  { d: 'M9.5 20h5a2.5 2.5 0 0 1-5 0Z', fillRule: 'evenodd' },
] as const;

export type BellFilledIconProps = IconProps & { animated?: IconAnimation };

export const BellFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, BellFilledIconProps>(
  function BellFilledIcon({ size = 24, animated, ...props }: BellFilledIconProps, ref) {
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
                'M11 2h2v2.1A6 6 0 0 1 18 10v4.5l2 2v2L19.5 19h-15l-.5-.5v-2l2-2V10a6 6 0 0 1 5-5.9z'
              }
              fillRule="evenodd"
            />
            <path d={'M9.5 20h5a2.5 2.5 0 0 1-5 0Z'} fillRule="evenodd" />
          </>
        )}
      </svg>
    );
  },
);
BellFilledIcon.displayName = 'BellFilledIcon';
