/* This file is generated from icons/chevrons-left.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';

const animation = {
  duration: 1100,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '-1.8 0', '0.36 0', '0 0', '0 0'],
      times: [0, 0.3, 0.5, 0.7, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M19.75 19.25v-1l-6-6v-.5l6-6v-1l-.5-.5h-1l-7.05 7.05v1.4l7.05 7.05h1z M12.75 19.25v-1l-6-6v-.5l6-6v-1l-.5-.5h-1L4.2 11.3v1.4l7.05 7.05h1z',
  },
] as const;

export type ChevronsLeftIconProps = Omit<
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

export const ChevronsLeftIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ChevronsLeftIconProps>(
  function ChevronsLeftIcon({ size = 24, animated, ...props }: ChevronsLeftIconProps, ref) {
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
                'M19.75 19.25v-1l-6-6v-.5l6-6v-1l-.5-.5h-1l-7.05 7.05v1.4l7.05 7.05h1z M12.75 19.25v-1l-6-6v-.5l6-6v-1l-.5-.5h-1L4.2 11.3v1.4l7.05 7.05h1z'
              }
            />
          </>
        )}
      </svg>
    );
  },
);
ChevronsLeftIcon.displayName = 'ChevronsLeftIcon';
