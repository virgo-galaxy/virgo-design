/* This file is generated from icons/chevrons-right.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1100,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '1.8 0', '-0.36 0', '0 0', '0 0'],
      times: [0, 0.3, 0.5, 0.7, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M4.25 19.25v-1l6-6v-.5l-6-6v-1l.5-.5h1l7.05 7.05v1.4l-7.05 7.05h-1z M11.25 19.25v-1l6-6v-.5l-6-6v-1l.5-.5h1l7.05 7.05v1.4l-7.05 7.05h-1z',
  },
] as const;

export type ChevronsRightIconProps = IconProps & { animated?: IconAnimation };

export const ChevronsRightIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ChevronsRightIconProps>(
  function ChevronsRightIcon({ size = 24, animated, ...props }: ChevronsRightIconProps, ref) {
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
                'M4.25 19.25v-1l6-6v-.5l-6-6v-1l.5-.5h1l7.05 7.05v1.4l-7.05 7.05h-1z M11.25 19.25v-1l6-6v-.5l-6-6v-1l.5-.5h1l7.05 7.05v1.4l-7.05 7.05h-1z'
              }
            />
          </>
        )}
      </svg>
    );
  },
);
ChevronsRightIcon.displayName = 'ChevronsRightIcon';
