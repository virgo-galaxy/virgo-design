/* This file is generated from icons/chevron-up.svg by scripts/generate.ts. Do not edit. */
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
        'M19.25 16.25 L18.25 16.25 L12.25 10.25 L11.75 10.25 L5.75 16.25 L4.75 16.25 L4.25 15.75 L4.25 14.75 L11.3 7.7 L12.700000000000001 7.7 L19.75 14.75 L19.75 15.75Z',
        'M19.75 8.25 L19.75 9.25 L12.700000000000001 16.3 L11.3 16.3 L4.25 9.25 L4.25 8.25 L4.75 7.75 L5.75 7.75 L11.75 13.75 L12.25 13.75 L18.25 7.75 L19.25 7.75Z',
        'M19.25 16.25 L18.25 16.25 L12.25 10.25 L11.75 10.25 L5.75 16.25 L4.75 16.25 L4.25 15.75 L4.25 14.75 L11.3 7.7 L12.700000000000001 7.7 L19.75 14.75 L19.75 15.75Z',
        'M19.25 16.25 L18.25 16.25 L12.25 10.25 L11.75 10.25 L5.75 16.25 L4.75 16.25 L4.25 15.75 L4.25 14.75 L11.3 7.7 L12.700000000000001 7.7 L19.75 14.75 L19.75 15.75Z',
      ],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M19.25 16.25h-1l-6-6h-.5l-6 6h-1l-.5-.5v-1l7.05-7.05h1.4l7.05 7.05v1z' },
] as const;

export type ChevronUpIconProps = Omit<
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

export const ChevronUpIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ChevronUpIconProps>(
  function ChevronUpIcon({ size = 24, animated, ...props }: ChevronUpIconProps, ref) {
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
            <path d={'M19.25 16.25h-1l-6-6h-.5l-6 6h-1l-.5-.5v-1l7.05-7.05h1.4l7.05 7.05v1z'} />
          </>
        )}
      </svg>
    );
  },
);
ChevronUpIcon.displayName = 'ChevronUpIcon';
