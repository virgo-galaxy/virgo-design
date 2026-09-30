/* This file is generated from icons/chevron-down.svg by scripts/generate.ts. Do not edit. */
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
        'M4.75 7.75 L5.75 7.75 L11.75 13.75 L12.25 13.75 L18.25 7.75 L19.25 7.75 L19.75 8.25 L19.75 9.25 L12.7 16.3 L11.299999999999999 16.3 L4.25 9.25 L4.25 8.25Z',
        'M4.25 15.75 L4.25 14.75 L11.299999999999999 7.699999999999999 L12.7 7.699999999999999 L19.75 14.75 L19.75 15.75 L19.25 16.25 L18.25 16.25 L12.25 10.25 L11.75 10.25 L5.75 16.25 L4.75 16.25Z',
        'M4.75 7.75 L5.75 7.75 L11.75 13.75 L12.25 13.75 L18.25 7.75 L19.25 7.75 L19.75 8.25 L19.75 9.25 L12.7 16.3 L11.299999999999999 16.3 L4.25 9.25 L4.25 8.25Z',
        'M4.75 7.75 L5.75 7.75 L11.75 13.75 L12.25 13.75 L18.25 7.75 L19.25 7.75 L19.75 8.25 L19.75 9.25 L12.7 16.3 L11.299999999999999 16.3 L4.25 9.25 L4.25 8.25Z',
      ],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M4.75 7.75h1l6 6h.5l6-6h1l.5.5v1l-7.05 7.05h-1.4L4.25 9.25v-1z' },
] as const;

export type ChevronDownIconProps = Omit<
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

export const ChevronDownIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ChevronDownIconProps>(
  function ChevronDownIcon({ size = 24, animated, ...props }: ChevronDownIconProps, ref) {
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
            <path d={'M4.75 7.75h1l6 6h.5l6-6h1l.5.5v1l-7.05 7.05h-1.4L4.25 9.25v-1z'} />
          </>
        )}
      </svg>
    );
  },
);
ChevronDownIcon.displayName = 'ChevronDownIcon';
