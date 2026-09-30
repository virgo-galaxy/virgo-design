/* This file is generated from icons/search.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';

const animation = {
  duration: 1200,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'scale',
      origin: [12, 12],
      values: ['1 1', '1.1 1.1', '1 1', '1 1'],
    },
    {
      path: 1,
      attribute: 'transform',
      transform: 'scale',
      origin: [12, 12],
      values: ['1 1', '1.1 1.1', '1 1', '1 1'],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M10 3.75a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 2.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Z',
    fillRule: 'evenodd',
  },
  { d: 'M15.2 14.55l1.4-1.4 4.4 4.4v1.4l-1.4 1.4h-1.4z' },
] as const;

export type SearchIconProps = Omit<
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

export const SearchIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, SearchIconProps>(
  function SearchIcon({ size = 24, animated, ...props }: SearchIconProps, ref) {
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
                'M10 3.75a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 2.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Z'
              }
              fillRule="evenodd"
            />
            <path d={'M15.2 14.55l1.4-1.4 4.4 4.4v1.4l-1.4 1.4h-1.4z'} />
          </>
        )}
      </svg>
    );
  },
);
SearchIcon.displayName = 'SearchIcon';
