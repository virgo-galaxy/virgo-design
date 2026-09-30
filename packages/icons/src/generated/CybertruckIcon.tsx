/* This file is generated from icons/cybertruck.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1300,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '0 -0.7', '0 0.25', '0 0', '0 0'],
      times: [0, 0.3, 0.5, 0.75, 1],
    },
    {
      path: 1,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '0 -0.3', '0 0', '0 0'],
    },
    {
      path: 2,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '0 -0.5', '0 0', '0 0'],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M1 11.5 11.25 7.5 23.5 10.42V14.5l-.5.5h-.75l-1-3h-3.5l-1 3h-7.5l-1-3h-3.5l-1 3H1.5l-.5-.5zM6.6 10.75h10.65l-.65-1L11.35 8.6zM1.5 12h.4v.4h-.4z',
    fillRule: 'evenodd',
  },
  {
    d: 'M6.5 12.75a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Zm0 1.15a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z',
    fillRule: 'evenodd',
  },
  {
    d: 'M19.5 12.75a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Zm0 1.15a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z',
    fillRule: 'evenodd',
  },
] as const;

export type CybertruckIconProps = IconProps & { animated?: IconAnimation };

export const CybertruckIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, CybertruckIconProps>(
  function CybertruckIcon({ size = 24, animated, ...props }: CybertruckIconProps, ref) {
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
                'M1 11.5 11.25 7.5 23.5 10.42V14.5l-.5.5h-.75l-1-3h-3.5l-1 3h-7.5l-1-3h-3.5l-1 3H1.5l-.5-.5zM6.6 10.75h10.65l-.65-1L11.35 8.6zM1.5 12h.4v.4h-.4z'
              }
              fillRule="evenodd"
            />
            <path
              d={
                'M6.5 12.75a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Zm0 1.15a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z'
              }
              fillRule="evenodd"
            />
            <path
              d={
                'M19.5 12.75a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Zm0 1.15a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z'
              }
              fillRule="evenodd"
            />
          </>
        )}
      </svg>
    );
  },
);
CybertruckIcon.displayName = 'CybertruckIcon';
