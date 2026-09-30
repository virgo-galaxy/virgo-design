/* This file is generated from icons/chevron-left.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';

const animation = {
  duration: 1200,
  tracks: [
    {
      path: 0,
      attribute: 'd',
      values: [
        'M16.25 4.75 L16.25 5.75 L10.25 11.75 L10.25 12.25 L16.25 18.25 L16.25 19.25 L15.75 19.75 L14.75 19.75 L7.7 12.7 L7.7 11.299999999999999 L14.75 4.249999999999999 L15.75 4.249999999999999Z',
        'M8.25 4.249999999999999 L9.25 4.249999999999999 L16.3 11.299999999999999 L16.3 12.7 L9.25 19.75 L8.25 19.75 L7.75 19.25 L7.75 18.25 L13.75 12.25 L13.75 11.75 L7.75 5.75 L7.75 4.75Z',
        'M16.25 4.75 L16.25 5.75 L10.25 11.75 L10.25 12.25 L16.25 18.25 L16.25 19.25 L15.75 19.75 L14.75 19.75 L7.7 12.7 L7.7 11.299999999999999 L14.75 4.249999999999999 L15.75 4.249999999999999Z',
        'M16.25 4.75 L16.25 5.75 L10.25 11.75 L10.25 12.25 L16.25 18.25 L16.25 19.25 L15.75 19.75 L14.75 19.75 L7.7 12.7 L7.7 11.299999999999999 L14.75 4.249999999999999 L15.75 4.249999999999999Z',
      ],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M16.25 4.75v1l-6 6v.5l6 6v1l-.5.5h-1L7.7 12.7v-1.4l7.05-7.05h1z' },
] as const;

export type ChevronLeftIconProps = Omit<
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

export const ChevronLeftIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ChevronLeftIconProps>(
  function ChevronLeftIcon({ size = 24, animated, ...props }: ChevronLeftIconProps, ref) {
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
            <path d={'M16.25 4.75v1l-6 6v.5l6 6v1l-.5.5h-1L7.7 12.7v-1.4l7.05-7.05h1z'} />
          </>
        )}
      </svg>
    );
  },
);
ChevronLeftIcon.displayName = 'ChevronLeftIcon';
