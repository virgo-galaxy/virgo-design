/* This file is generated from icons/sun.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1800,
  tracks: [
    {
      path: 1,
      attribute: 'transform',
      transform: 'rotate',
      values: ['0 12 12', '45 12 12', '0 12 12', '0 12 12'],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z' },
  {
    d: 'M11.35 2 12.65 2 13 2.35 13 5 11 5 11 2.35ZM18.611 4.469 19.531 5.389 19.531 5.884 17.657 7.757 16.243 6.343 18.116 4.469ZM22 11.35 22 12.65 21.65 13 19 13 19 11 21.65 11ZM19.531 18.611 18.611 19.531 18.116 19.531 16.243 17.657 17.657 16.243 19.531 18.116ZM12.65 22 11.35 22 11 21.65 11 19 13 19 13 21.65ZM5.389 19.531 4.469 18.611 4.469 18.116 6.343 16.243 7.757 17.657 5.884 19.531ZM2 12.65 2 11.35 2.35 11 5 11 5 13 2.35 13ZM4.469 5.389 5.389 4.469 5.884 4.469 7.757 6.343 6.343 7.757 4.469 5.884Z',
  },
] as const;

export type SunIconProps = IconProps & { animated?: IconAnimation };

export const SunIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, SunIconProps>(function SunIcon(
  { size = 24, animated, ...props }: SunIconProps,
  ref,
) {
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
          <path d={'M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z'} />
          <path
            d={
              'M11.35 2 12.65 2 13 2.35 13 5 11 5 11 2.35ZM18.611 4.469 19.531 5.389 19.531 5.884 17.657 7.757 16.243 6.343 18.116 4.469ZM22 11.35 22 12.65 21.65 13 19 13 19 11 21.65 11ZM19.531 18.611 18.611 19.531 18.116 19.531 16.243 17.657 17.657 16.243 19.531 18.116ZM12.65 22 11.35 22 11 21.65 11 19 13 19 13 21.65ZM5.389 19.531 4.469 18.611 4.469 18.116 6.343 16.243 7.757 17.657 5.884 19.531ZM2 12.65 2 11.35 2.35 11 5 11 5 13 2.35 13ZM4.469 5.389 5.389 4.469 5.884 4.469 7.757 6.343 6.343 7.757 4.469 5.884Z'
            }
          />
        </>
      )}
    </svg>
  );
});
SunIcon.displayName = 'SunIcon';
