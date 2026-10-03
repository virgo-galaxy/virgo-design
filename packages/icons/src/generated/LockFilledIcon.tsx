/* This file is generated from icons/lock-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1500,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'rotate',
      values: ['0 8 9.5', '-12 8 9.5', '0 8 9.5', '0 8 9.5'],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M7 9.5v-4L9.5 3h5L17 5.5v4h-2v-3L13.5 5h-3L9 6.5v3z', fillRule: 'evenodd' },
  {
    d: 'M5.5 9.5h13l1 1v9l-1 1h-13l-1-1v-9z M11.5 13h1l.5.5v3l-.5.5h-1l-.5-.5v-3z',
    fillRule: 'evenodd',
  },
] as const;

export type LockFilledIconProps = IconProps & { animated?: IconAnimation };

export const LockFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, LockFilledIconProps>(
  function LockFilledIcon({ size = 24, animated, ...props }: LockFilledIconProps, ref) {
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
            <path d={'M7 9.5v-4L9.5 3h5L17 5.5v4h-2v-3L13.5 5h-3L9 6.5v3z'} fillRule="evenodd" />
            <path
              d={'M5.5 9.5h13l1 1v9l-1 1h-13l-1-1v-9z M11.5 13h1l.5.5v3l-.5.5h-1l-.5-.5v-3z'}
              fillRule="evenodd"
            />
          </>
        )}
      </svg>
    );
  },
);
LockFilledIcon.displayName = 'LockFilledIcon';
