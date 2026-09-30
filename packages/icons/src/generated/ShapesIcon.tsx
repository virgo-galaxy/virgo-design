/* This file is generated from icons/shapes.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';

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
  { d: 'M11.5 2h1l5 8.5-.5 1h-10l-.5-1z M9.5 9.5h5L12 5.25z', fillRule: 'evenodd' },
  { d: 'M3 13h7l.5.5v7l-.5.5H3l-.5-.5v-7z M4.5 15v4h4v-4z', fillRule: 'evenodd' },
  {
    d: 'M17.5 12.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z M17.5 14.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
    fillRule: 'evenodd',
  },
] as const;

export type ShapesIconProps = Omit<
  SVGProps<SVGSVGElement>,
  | 'stroke'
  | 'strokeLinecap'
  | 'strokeLinejoin'
  | 'strokeWidth'
  | 'viewBox'
  | 'fill'
  | 'width'
  | 'height'
  | 'children'
  | 'ref'
> & {
  size?: number;
  animated?: IconAnimation;
};

export const ShapesIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ShapesIconProps>(
  function ShapesIcon({ size = 24, animated, ...props }: ShapesIconProps, ref) {
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
            <path d={'M11.5 2h1l5 8.5-.5 1h-10l-.5-1z M9.5 9.5h5L12 5.25z'} fillRule="evenodd" />
            <path d={'M3 13h7l.5.5v7l-.5.5H3l-.5-.5v-7z M4.5 15v4h4v-4z'} fillRule="evenodd" />
            <path
              d={
                'M17.5 12.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z M17.5 14.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z'
              }
              fillRule="evenodd"
            />
          </>
        )}
      </svg>
    );
  },
);
ShapesIcon.displayName = 'ShapesIcon';
