/* This file is generated from icons/bell.svg by scripts/generate.ts. Do not edit. */
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
    d: 'M11 2h2v2.1A6 6 0 0 1 18 10v4.5l2 2v2L19.5 19h-15l-.5-.5v-2l2-2V10a6 6 0 0 1 5-5.9z M8 10v5.5L6.5 17h11L16 15.5V10a4 4 0 0 0-8 0Z',
    fillRule: 'evenodd',
  },
  { d: 'M9.5 20h5a2.5 2.5 0 0 1-5 0Z' },
] as const;

export type BellIconProps = IconProps & { animated?: IconAnimation };

export const BellIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, BellIconProps>(function BellIcon(
  { size = 24, animated, ...props }: BellIconProps,
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
              'M11 2h2v2.1A6 6 0 0 1 18 10v4.5l2 2v2L19.5 19h-15l-.5-.5v-2l2-2V10a6 6 0 0 1 5-5.9z M8 10v5.5L6.5 17h11L16 15.5V10a4 4 0 0 0-8 0Z'
            }
            fillRule="evenodd"
          />
          <path d={'M9.5 20h5a2.5 2.5 0 0 1-5 0Z'} />
        </>
      )}
    </svg>
  );
});
BellIcon.displayName = 'BellIcon';
