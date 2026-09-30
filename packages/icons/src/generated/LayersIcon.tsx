/* This file is generated from icons/layers.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1700,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '0 -0.7', '0 2.8', '0 0', '0 0'],
      times: [0, 0.25, 0.5, 0.8, 1],
    },
    {
      path: 2,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '0 0.7', '0 -2.8', '0 0', '0 0'],
      times: [0, 0.25, 0.5, 0.8, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M11.5 2h1l9 4.5.5.75v1.5l-.5.75-9 4.5h-1l-9-4.5L2 8.75v-1.5l.5-.75z M5 8l7 3.5L19 8l-7-3.5z',
    fillRule: 'evenodd',
  },
  { d: 'M2.5 11.5 12 16.25l9.5-4.75.5.5v1.5l-.5.5-9 4.5h-1l-9-4.5-.5-.5V12z' },
  { d: 'M2.5 16 12 20.75 21.5 16l.5.5V18l-.5.5-9 4.5h-1l-9-4.5L2 18v-1.5z' },
] as const;

export type LayersIconProps = IconProps & { animated?: IconAnimation };

export const LayersIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, LayersIconProps>(
  function LayersIcon({ size = 24, animated, ...props }: LayersIconProps, ref) {
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
                'M11.5 2h1l9 4.5.5.75v1.5l-.5.75-9 4.5h-1l-9-4.5L2 8.75v-1.5l.5-.75z M5 8l7 3.5L19 8l-7-3.5z'
              }
              fillRule="evenodd"
            />
            <path d={'M2.5 11.5 12 16.25l9.5-4.75.5.5v1.5l-.5.5-9 4.5h-1l-9-4.5-.5-.5V12z'} />
            <path d={'M2.5 16 12 20.75 21.5 16l.5.5V18l-.5.5-9 4.5h-1l-9-4.5L2 18v-1.5z'} />
          </>
        )}
      </svg>
    );
  },
);
LayersIcon.displayName = 'LayersIcon';
