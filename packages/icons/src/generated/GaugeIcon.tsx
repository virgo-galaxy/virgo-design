/* This file is generated from icons/gauge.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';

const animation = {
  duration: 1800,
  tracks: [
    {
      path: 3,
      attribute: 'transform',
      transform: 'rotate',
      values: ['0 12 16', '-65 12 16', '15 12 16', '0 12 16', '0 12 16'],
      times: [0, 0.25, 0.55, 0.8, 1],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M4 19H3l-.5-.5V14a9.5 9.5 0 0 1 19 0v4.5l-.5.5h-1l-.5-.5V14a7.5 7.5 0 0 0-15 0v4.5z' },
  { d: 'M11 7.5h2V10h-2z M6 10.5l1-1 2 2-1 1z' },
  { d: 'M12 14.25a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5Z' },
  { d: 'M16.75 9h.5v.5L13.5 17l-2-2z' },
] as const;

export type GaugeIconProps = Omit<
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

export const GaugeIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, GaugeIconProps>(
  function GaugeIcon({ size = 24, animated, ...props }: GaugeIconProps, ref) {
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
                'M4 19H3l-.5-.5V14a9.5 9.5 0 0 1 19 0v4.5l-.5.5h-1l-.5-.5V14a7.5 7.5 0 0 0-15 0v4.5z'
              }
            />
            <path d={'M11 7.5h2V10h-2z M6 10.5l1-1 2 2-1 1z'} />
            <path d={'M12 14.25a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5Z'} />
            <path d={'M16.75 9h.5v.5L13.5 17l-2-2z'} />
          </>
        )}
      </svg>
    );
  },
);
GaugeIcon.displayName = 'GaugeIcon';
