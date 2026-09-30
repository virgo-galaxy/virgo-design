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
    d: 'M11.508 5.518 12.264 3.942 14.239 4.255 14.471 5.988A6.5 6.5 0 0 1 16.235 7.069L17.884 6.489 19.060 8.107 17.998 9.497A6.5 6.5 0 0 1 18.482 11.508L20.058 12.264 19.745 14.239 18.012 14.471A6.5 6.5 0 0 1 16.931 16.235L17.511 17.884 15.893 19.060 14.503 17.998A6.5 6.5 0 0 1 12.492 18.482L11.736 20.058 9.761 19.745 9.529 18.012A6.5 6.5 0 0 1 7.765 16.931L6.116 17.511 4.940 15.893 6.002 14.503A6.5 6.5 0 0 1 5.518 12.492L3.942 11.736 4.255 9.761 5.988 9.529A6.5 6.5 0 0 1 7.069 7.765L6.489 6.116 8.107 4.940 9.497 6.002A6.5 6.5 0 0 1 11.508 5.518ZM12 7.75a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5Z',
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
                'M11.508 5.518 12.264 3.942 14.239 4.255 14.471 5.988A6.5 6.5 0 0 1 16.235 7.069L17.884 6.489 19.060 8.107 17.998 9.497A6.5 6.5 0 0 1 18.482 11.508L20.058 12.264 19.745 14.239 18.012 14.471A6.5 6.5 0 0 1 16.931 16.235L17.511 17.884 15.893 19.060 14.503 17.998A6.5 6.5 0 0 1 12.492 18.482L11.736 20.058 9.761 19.745 9.529 18.012A6.5 6.5 0 0 1 7.765 16.931L6.116 17.511 4.940 15.893 6.002 14.503A6.5 6.5 0 0 1 5.518 12.492L3.942 11.736 4.255 9.761 5.988 9.529A6.5 6.5 0 0 1 7.069 7.765L6.489 6.116 8.107 4.940 9.497 6.002A6.5 6.5 0 0 1 11.508 5.518ZM12 7.75a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5Z'
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
