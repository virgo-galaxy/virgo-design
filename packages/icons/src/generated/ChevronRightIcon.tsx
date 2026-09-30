/* This file is generated from icons/chevron-right.svg by scripts/generate.ts. Do not edit. */
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
        'M7.75 19.25 L7.75 18.25 L13.75 12.25 L13.75 11.75 L7.75 5.75 L7.75 4.75 L8.25 4.25 L9.25 4.25 L16.3 11.3 L16.3 12.700000000000001 L9.25 19.75 L8.25 19.75Z',
        'M15.75 19.75 L14.75 19.75 L7.699999999999999 12.700000000000001 L7.699999999999999 11.3 L14.75 4.25 L15.75 4.25 L16.25 4.75 L16.25 5.75 L10.25 11.75 L10.25 12.25 L16.25 18.25 L16.25 19.25Z',
        'M7.75 19.25 L7.75 18.25 L13.75 12.25 L13.75 11.75 L7.75 5.75 L7.75 4.75 L8.25 4.25 L9.25 4.25 L16.3 11.3 L16.3 12.700000000000001 L9.25 19.75 L8.25 19.75Z',
        'M7.75 19.25 L7.75 18.25 L13.75 12.25 L13.75 11.75 L7.75 5.75 L7.75 4.75 L8.25 4.25 L9.25 4.25 L16.3 11.3 L16.3 12.700000000000001 L9.25 19.75 L8.25 19.75Z',
      ],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M7.75 19.25v-1l6-6v-.5l-6-6v-1l.5-.5h1l7.05 7.05v1.4l-7.05 7.05h-1z' },
] as const;

export type ChevronRightIconProps = Omit<
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

export const ChevronRightIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ChevronRightIconProps>(
  function ChevronRightIcon({ size = 24, animated, ...props }: ChevronRightIconProps, ref) {
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
            <path d={'M7.75 19.25v-1l6-6v-.5l-6-6v-1l.5-.5h1l7.05 7.05v1.4l-7.05 7.05h-1z'} />
          </>
        )}
      </svg>
    );
  },
);
ChevronRightIcon.displayName = 'ChevronRightIcon';
