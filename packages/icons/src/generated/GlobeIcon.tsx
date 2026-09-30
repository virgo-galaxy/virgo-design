/* This file is generated from icons/globe.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';

const animation = {
  duration: 2200,
  tracks: [
    {
      path: 1,
      attribute: 'd',
      values: [
        'M12 3C15 3 16.5 7 16.5 12S15 21 12 21S7.5 17 7.5 12S9 3 12 3Z M12 5C10.5 5 9.25 8 9.25 12S10.5 19 12 19S14.75 16 14.75 12S13.5 5 12 5Z',
        'M12 3C12.45 3 12.675 7 12.675 12S12.45 21 12 21S11.325 17 11.325 12S11.55 3 12 3Z M12 5C11.775 5 11.5875 8 11.5875 12S11.775 19 12 19S12.4125 16 12.4125 12S12.225 5 12 5Z',
        'M12 3C15 3 16.5 7 16.5 12S15 21 12 21S7.5 17 7.5 12S9 3 12 3Z M12 5C10.5 5 9.25 8 9.25 12S10.5 19 12 19S14.75 16 14.75 12S13.5 5 12 5Z',
        'M12 3C15 3 16.5 7 16.5 12S15 21 12 21S7.5 17 7.5 12S9 3 12 3Z M12 5C10.5 5 9.25 8 9.25 12S10.5 19 12 19S14.75 16 14.75 12S13.5 5 12 5Z',
      ],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z',
    fillRule: 'evenodd',
  },
  {
    d: 'M12 3c3 0 4.5 4 4.5 9s-1.5 9-4.5 9-4.5-4-4.5-9S9 3 12 3Z M12 5c-1.5 0-2.75 3-2.75 7s1.25 7 2.75 7 2.75-3 2.75-7S13.5 5 12 5Z',
    fillRule: 'evenodd',
  },
  { d: 'M4 11h16v2H4z' },
] as const;

export type GlobeIconProps = Omit<
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

export const GlobeIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, GlobeIconProps>(
  function GlobeIcon({ size = 24, animated, ...props }: GlobeIconProps, ref) {
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
              d={'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z'}
              fillRule="evenodd"
            />
            <path
              d={
                'M12 3c3 0 4.5 4 4.5 9s-1.5 9-4.5 9-4.5-4-4.5-9S9 3 12 3Z M12 5c-1.5 0-2.75 3-2.75 7s1.25 7 2.75 7 2.75-3 2.75-7S13.5 5 12 5Z'
              }
              fillRule="evenodd"
            />
            <path d={'M4 11h16v2H4z'} />
          </>
        )}
      </svg>
    );
  },
);
GlobeIcon.displayName = 'GlobeIcon';
