/* This file is generated from icons/close.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1500,
  tracks: [
    {
      path: 0,
      attribute: 'd',
      reveal: true,
      values: [
        'M5.7 5.7 L5.7 5.7 L5.7 5.7 L5.7 5.7 L5.7 5.7 L5.7 5.7 L5.7 5.7 L5.7 5.7Z',
        'M5.7 5.7 L5.7 5.7 L5.7 5.7 L5.7 5.7 L5.7 5.7 L5.7 5.7 L5.7 5.7 L5.7 5.7Z',
        'M5 5.875L5.875 5L6.4 5L19 17.6L19 18.125L18.125 19L17.6 19L5 6.4Z',
        'M5 5.875L5.875 5L6.4 5L19 17.6L19 18.125L18.125 19L17.6 19L5 6.4Z',
      ],
      times: [0, 0.04, 0.4, 1],
    },
    {
      path: 1,
      attribute: 'd',
      reveal: true,
      values: [
        'M18.3 5.7 L18.3 5.7 L18.3 5.7 L18.3 5.7 L18.3 5.7 L18.3 5.7 L18.3 5.7 L18.3 5.7Z',
        'M18.3 5.7 L18.3 5.7 L18.3 5.7 L18.3 5.7 L18.3 5.7 L18.3 5.7 L18.3 5.7 L18.3 5.7Z',
        'M17.6 5L18.125 5L19 5.875L19 6.4L6.4 19L5.875 19L5 18.125L5 17.6Z',
        'M17.6 5L18.125 5L19 5.875L19 6.4L6.4 19L5.875 19L5 18.125L5 17.6Z',
      ],
      times: [0, 0.32, 0.7, 1],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M5 5.875L5.875 5L6.4 5L19 17.6L19 18.125L18.125 19L17.6 19L5 6.4Z' },
  { d: 'M17.6 5L18.125 5L19 5.875L19 6.4L6.4 19L5.875 19L5 18.125L5 17.6Z' },
] as const;

export type CloseIconProps = IconProps & { animated?: IconAnimation };

export const CloseIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, CloseIconProps>(
  function CloseIcon({ size = 24, animated, ...props }: CloseIconProps, ref) {
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
            <path d={'M5 5.875L5.875 5L6.4 5L19 17.6L19 18.125L18.125 19L17.6 19L5 6.4Z'} />
            <path d={'M17.6 5L18.125 5L19 5.875L19 6.4L6.4 19L5.875 19L5 18.125L5 17.6Z'} />
          </>
        )}
      </svg>
    );
  },
);
CloseIcon.displayName = 'CloseIcon';
