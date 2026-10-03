/* This file is generated from icons/shapes-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 2600,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '5.5 10', '-5.5 10', '0 0', '0 0'],
      times: [0, 0.28, 0.56, 0.84, 1],
    },
    {
      path: 1,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '5.5 -10', '11 0', '0 0', '0 0'],
      times: [0, 0.28, 0.56, 0.84, 1],
    },
    {
      path: 2,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '-11 0', '-5.5 -10', '0 0', '0 0'],
      times: [0, 0.28, 0.56, 0.84, 1],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M11.5 2h1l5 8.5-.5 1h-10l-.5-1z', fillRule: 'evenodd' },
  { d: 'M3 13h7l.5.5v7l-.5.5H3l-.5-.5v-7z', fillRule: 'evenodd' },
  { d: 'M17.5 12.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z', fillRule: 'evenodd' },
] as const;

export type ShapesFilledIconProps = IconProps & { animated?: IconAnimation };

export const ShapesFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ShapesFilledIconProps>(
  function ShapesFilledIcon({ size = 24, animated, ...props }: ShapesFilledIconProps, ref) {
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
            <path d={'M11.5 2h1l5 8.5-.5 1h-10l-.5-1z'} fillRule="evenodd" />
            <path d={'M3 13h7l.5.5v7l-.5.5H3l-.5-.5v-7z'} fillRule="evenodd" />
            <path d={'M17.5 12.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z'} fillRule="evenodd" />
          </>
        )}
      </svg>
    );
  },
);
ShapesFilledIcon.displayName = 'ShapesFilledIcon';
