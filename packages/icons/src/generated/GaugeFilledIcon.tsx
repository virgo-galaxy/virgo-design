/* This file is generated from icons/gauge-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1800,
  tracks: [
    {
      path: 0,
      attribute: 'd',
      values: [
        'M12 4.5a9.5 9.5 0 0 1 9.5 9.5v4.5l-.5.5H3l-.5-.5V14A9.5 9.5 0 0 1 12 4.5Z M11 7.5h2V10h-2z M6 10.5l1-1 2 2-1 1z M16.75 9L17.25 9L17.25 9.5L13.65 16.7A1.75 1.75 0 1 1 11.2 14.4Z',
        'M12 4.5a9.5 9.5 0 0 1 9.5 9.5v4.5l-.5.5H3l-.5-.5V14A9.5 9.5 0 0 1 12 4.5Z M11 7.5h2V10h-2z M6 10.5l1-1 2 2-1 1z M7.663 8.737L7.875 8.284L8.328 8.495L13.332 14.8A1.75 1.75 0 1 1 10.212 16.049Z',
        'M12 4.5a9.5 9.5 0 0 1 9.5 9.5v4.5l-.5.5H3l-.5-.5V14A9.5 9.5 0 0 1 12 4.5Z M11 7.5h2V10h-2z M6 10.5l1-1 2 2-1 1z M18.4 10.468L18.883 10.597L18.753 11.08L13.413 17.103A1.75 1.75 0 1 1 11.641 14.247Z',
        'M12 4.5a9.5 9.5 0 0 1 9.5 9.5v4.5l-.5.5H3l-.5-.5V14A9.5 9.5 0 0 1 12 4.5Z M11 7.5h2V10h-2z M6 10.5l1-1 2 2-1 1z M16.75 9L17.25 9L17.25 9.5L13.65 16.7A1.75 1.75 0 1 1 11.2 14.4Z',
        'M12 4.5a9.5 9.5 0 0 1 9.5 9.5v4.5l-.5.5H3l-.5-.5V14A9.5 9.5 0 0 1 12 4.5Z M11 7.5h2V10h-2z M6 10.5l1-1 2 2-1 1z M16.75 9L17.25 9L17.25 9.5L13.65 16.7A1.75 1.75 0 1 1 11.2 14.4Z',
      ],
      times: [0, 0.25, 0.55, 0.8, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M12 4.5a9.5 9.5 0 0 1 9.5 9.5v4.5l-.5.5H3l-.5-.5V14A9.5 9.5 0 0 1 12 4.5Z M11 7.5h2V10h-2z M6 10.5l1-1 2 2-1 1z M16.75 9h.5v.5l-3.6 7.2a1.75 1.75 0 1 1-2.45-2.3z',
    fillRule: 'evenodd',
  },
] as const;

export type GaugeFilledIconProps = IconProps & { animated?: IconAnimation };

export const GaugeFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, GaugeFilledIconProps>(
  function GaugeFilledIcon({ size = 24, animated, ...props }: GaugeFilledIconProps, ref) {
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
                'M12 4.5a9.5 9.5 0 0 1 9.5 9.5v4.5l-.5.5H3l-.5-.5V14A9.5 9.5 0 0 1 12 4.5Z M11 7.5h2V10h-2z M6 10.5l1-1 2 2-1 1z M16.75 9h.5v.5l-3.6 7.2a1.75 1.75 0 1 1-2.45-2.3z'
              }
              fillRule="evenodd"
            />
          </>
        )}
      </svg>
    );
  },
);
GaugeFilledIcon.displayName = 'GaugeFilledIcon';
