/* This file is generated from icons/settings.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1400,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'rotate',
      values: ['0 12 12', '30 12 12', '0 12 12', '0 12 12'],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M11.446 4.708 12.297 2.935 14.519 3.287 14.78 5.237 A7.312 7.312 0 0 1 16.764 6.453 L18.62 5.8 19.942 7.62 18.748 9.184 A7.312 7.312 0 0 1 19.292 11.446 L21.065 12.297 20.713 14.519 18.764 14.78 A7.312 7.312 0 0 1 17.547 16.764 L18.2 18.62 16.38 19.942 14.816 18.748 A7.312 7.312 0 0 1 12.554 19.292 L11.703 21.065 9.481 20.713 9.22 18.764 A7.312 7.312 0 0 1 7.236 17.547 L5.38 18.2 4.058 16.38 5.252 14.816 A7.312 7.312 0 0 1 4.708 12.554 L2.935 11.703 3.287 9.481 5.237 9.22 A7.312 7.312 0 0 1 6.453 7.236 L5.8 5.38 7.62 4.058 9.184 5.252 A7.312 7.312 0 0 1 11.446 4.708 Z M12 7.219 a4.781 4.781 0 1 0 0 9.562 4.781 4.781 0 0 0 0 -9.562 Z',
    fillRule: 'evenodd',
  },
] as const;

export type SettingsIconProps = IconProps & { animated?: IconAnimation };

export const SettingsIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, SettingsIconProps>(
  function SettingsIcon({ size = 24, animated, ...props }: SettingsIconProps, ref) {
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
                'M11.446 4.708 12.297 2.935 14.519 3.287 14.78 5.237 A7.312 7.312 0 0 1 16.764 6.453 L18.62 5.8 19.942 7.62 18.748 9.184 A7.312 7.312 0 0 1 19.292 11.446 L21.065 12.297 20.713 14.519 18.764 14.78 A7.312 7.312 0 0 1 17.547 16.764 L18.2 18.62 16.38 19.942 14.816 18.748 A7.312 7.312 0 0 1 12.554 19.292 L11.703 21.065 9.481 20.713 9.22 18.764 A7.312 7.312 0 0 1 7.236 17.547 L5.38 18.2 4.058 16.38 5.252 14.816 A7.312 7.312 0 0 1 4.708 12.554 L2.935 11.703 3.287 9.481 5.237 9.22 A7.312 7.312 0 0 1 6.453 7.236 L5.8 5.38 7.62 4.058 9.184 5.252 A7.312 7.312 0 0 1 11.446 4.708 Z M12 7.219 a4.781 4.781 0 1 0 0 9.562 4.781 4.781 0 0 0 0 -9.562 Z'
              }
              fillRule="evenodd"
            />
          </>
        )}
      </svg>
    );
  },
);
SettingsIcon.displayName = 'SettingsIcon';
