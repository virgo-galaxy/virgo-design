/* This file is generated from icons/eye.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';

const animation = {
  duration: 1800,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'scale',
      origin: [12, 12],
      values: ['1 1', '1 0.1', '1 1', '1 1'],
      times: [0, 0.22, 0.44, 1],
    },
    {
      path: 1,
      attribute: 'transform',
      transform: 'scale',
      origin: [12, 12],
      values: ['1 1', '1 0.1', '1 1', '1 1'],
      times: [0, 0.22, 0.44, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M2 12C4.5 8 7.5 6 12 6s7.5 2 10 6c-2.5 4-5.5 6-10 6S4.5 16 2 12Z M4.5 12c2 2.75 4.25 4 7.5 4s5.5-1.25 7.5-4c-2-2.75-4.25-4-7.5-4S6.5 9.25 4.5 12Z',
    fillRule: 'evenodd',
  },
  { d: 'M12 9.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z' },
] as const;

export type EyeIconProps = Omit<
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

export const EyeIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, EyeIconProps>(function EyeIcon(
  { size = 24, animated, ...props }: EyeIconProps,
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
              'M2 12C4.5 8 7.5 6 12 6s7.5 2 10 6c-2.5 4-5.5 6-10 6S4.5 16 2 12Z M4.5 12c2 2.75 4.25 4 7.5 4s5.5-1.25 7.5-4c-2-2.75-4.25-4-7.5-4S6.5 9.25 4.5 12Z'
            }
            fillRule="evenodd"
          />
          <path d={'M12 9.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z'} />
        </>
      )}
    </svg>
  );
});
EyeIcon.displayName = 'EyeIcon';
