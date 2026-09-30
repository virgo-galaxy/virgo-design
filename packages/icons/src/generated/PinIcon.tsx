/* This file is generated from icons/pin.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';

const animation = {
  duration: 1600,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'rotate',
      values: ['0 12 12', '-9 12 12', '9 12 12', '0 12 12', '0 12 12'],
      times: [0, 0.25, 0.5, 0.8, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M9.457 2.485 17.359 3.737 18.19 4.881 18.033 5.868 15.745 7.531 15.119 11.482 17.613 14.914 17.457 15.902 16.313 16.733 12.362 16.107 11.658 20.552 10.514 21.383 9.683 20.239 10.387 15.794 6.436 15.169 5.605 14.024 5.761 13.037 9.193 10.543 9.819 6.592 8.157 4.304 8.313 3.316Z M11.041 5.267 11.873 6.411 11.012 11.844 8.724 13.506 14.65 14.445 12.988 12.156 13.848 6.724 14.992 5.893Z',
    fillRule: 'evenodd',
  },
] as const;

export type PinIconProps = Omit<
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

export const PinIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, PinIconProps>(function PinIcon(
  { size = 24, animated, ...props }: PinIconProps,
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
          <path
            d={
              'M9.457 2.485 17.359 3.737 18.19 4.881 18.033 5.868 15.745 7.531 15.119 11.482 17.613 14.914 17.457 15.902 16.313 16.733 12.362 16.107 11.658 20.552 10.514 21.383 9.683 20.239 10.387 15.794 6.436 15.169 5.605 14.024 5.761 13.037 9.193 10.543 9.819 6.592 8.157 4.304 8.313 3.316Z M11.041 5.267 11.873 6.411 11.012 11.844 8.724 13.506 14.65 14.445 12.988 12.156 13.848 6.724 14.992 5.893Z'
            }
            fillRule="evenodd"
          />
        </>
      )}
    </svg>
  );
});
PinIcon.displayName = 'PinIcon';
