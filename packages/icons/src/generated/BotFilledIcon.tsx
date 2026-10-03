/* This file is generated from icons/bot-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1500,
  tracks: [
    {
      path: 2,
      attribute: 'transform',
      transform: 'rotate',
      values: ['0 12 6', '-18 12 6', '18 12 6', '0 12 6', '0 12 6'],
      times: [0, 0.25, 0.5, 0.8, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M13 6h5l1 1v10.5l-2 2h-10l-2-2V7l1-1z M8 11h3v1.5H8z M13 11h3v1.5h-3z',
    fillRule: 'evenodd',
  },
  { d: 'M3 10.5h1.5v4H3l-.5-.5v-3z M19.5 10.5H21l.5.5v3l-.5.5h-1.5z', fillRule: 'evenodd' },
  { d: 'M11.5 3h1l.5.5V6h-2V3.5z', fillRule: 'evenodd' },
] as const;

export type BotFilledIconProps = IconProps & { animated?: IconAnimation };

export const BotFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, BotFilledIconProps>(
  function BotFilledIcon({ size = 24, animated, ...props }: BotFilledIconProps, ref) {
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
              d={'M13 6h5l1 1v10.5l-2 2h-10l-2-2V7l1-1z M8 11h3v1.5H8z M13 11h3v1.5h-3z'}
              fillRule="evenodd"
            />
            <path
              d={'M3 10.5h1.5v4H3l-.5-.5v-3z M19.5 10.5H21l.5.5v3l-.5.5h-1.5z'}
              fillRule="evenodd"
            />
            <path d={'M11.5 3h1l.5.5V6h-2V3.5z'} fillRule="evenodd" />
          </>
        )}
      </svg>
    );
  },
);
BotFilledIcon.displayName = 'BotFilledIcon';
