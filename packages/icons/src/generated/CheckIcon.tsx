/* This file is generated from icons/check.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1400,
  tracks: [
    {
      path: 0,
      attribute: 'd',
      reveal: true,
      values: [
        'M5 11.5 L5 11.5 L5 11.5 L5 11.5 L5 11.5 L5 11.5 L5 11.5 L5 11.5 L5 11.5 L5 11.5 L5 11.5Z',
        'M4.875 10.75 L5.75 10.75 L10 15 L10 15 L10 15 L10.7 15.7 L10.7 17.3 L10.7 17.3 L9.3 17.3 L4.25 12.25 L4.25 11.375Z',
        'M4.875 10.75L5.75 10.75L10 15L18.5 6.5L19.375 6.5L20 7.125L20 8L10.7 17.3L9.3 17.3L4.25 12.25L4.25 11.375Z',
        'M4.875 10.75L5.75 10.75L10 15L18.5 6.5L19.375 6.5L20 7.125L20 8L10.7 17.3L9.3 17.3L4.25 12.25L4.25 11.375Z',
      ],
      times: [0, 0.24, 0.6, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M4.875 10.75L5.75 10.75L10 15L18.5 6.5L19.375 6.5L20 7.125L20 8L10.7 17.3L9.3 17.3L4.25 12.25L4.25 11.375Z',
  },
] as const;

export type CheckIconProps = IconProps & { animated?: IconAnimation };

export const CheckIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, CheckIconProps>(
  function CheckIcon({ size = 24, animated, ...props }: CheckIconProps, ref) {
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
                'M4.875 10.75L5.75 10.75L10 15L18.5 6.5L19.375 6.5L20 7.125L20 8L10.7 17.3L9.3 17.3L4.25 12.25L4.25 11.375Z'
              }
            />
          </>
        )}
      </svg>
    );
  },
);
CheckIcon.displayName = 'CheckIcon';
