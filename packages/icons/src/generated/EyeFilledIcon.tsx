/* This file is generated from icons/eye-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1800,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'scale',
      origin: [12, 12],
      values: ['1 1', '1 0.1', '1 1', '1 1'],
      times: [0, 0.22, 0.44, 1],
    },
    {
      path: 1,
      attribute: 'transform',
      transform: 'scale',
      origin: [12, 12],
      values: ['1 1', '1 0.1', '1 1', '1 1'],
      times: [0, 0.22, 0.44, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M2 12C4.5 8 7.5 6 12 6s7.5 2 10 6c-2.5 4-5.5 6-10 6S4.5 16 2 12Z M12 8.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Z',
    fillRule: 'evenodd',
  },
  { d: 'M12 9.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z', fillRule: 'evenodd' },
] as const;

export type EyeFilledIconProps = IconProps & { animated?: IconAnimation };

export const EyeFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, EyeFilledIconProps>(
  function EyeFilledIcon({ size = 24, animated, ...props }: EyeFilledIconProps, ref) {
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
                'M2 12C4.5 8 7.5 6 12 6s7.5 2 10 6c-2.5 4-5.5 6-10 6S4.5 16 2 12Z M12 8.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Z'
              }
              fillRule="evenodd"
            />
            <path d={'M12 9.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z'} fillRule="evenodd" />
          </>
        )}
      </svg>
    );
  },
);
EyeFilledIcon.displayName = 'EyeFilledIcon';
