/* This file is generated from icons/external-link.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 1700,
  tracks: [
    {
      path: 0,
      attribute: 'd',
      values: [
        'M5.5 5.5 L12.5 5.5 L13 6 L13 7 L12.5 7.5 L6.5 7.5 L6.5 17.5 L16.5 17.5 L16.5 11.5 L17 11 L18 11 L18.5 11.5 L18.5 18.5 L17.5 19.5 L5.5 19.5 L4.5 18.5 L4.5 6.5Z',
        'M5.5 5.5 L12.5 4.6 L13 5 L13 6 L12.5 6.6 L6.5 7.5 L6.5 17.5 L16.5 17.5 L17.4 11.5 L18 11 L19 11 L19.4 11.5 L18.5 18.5 L17.5 19.5 L5.5 19.5 L4.5 18.5 L4.5 6.5Z',
        'M5.5 5.5 L12.5 4.6 L13 5 L13 6 L12.5 6.6 L6.5 7.5 L6.5 17.5 L16.5 17.5 L17.4 11.5 L18 11 L19 11 L19.4 11.5 L18.5 18.5 L17.5 19.5 L5.5 19.5 L4.5 18.5 L4.5 6.5Z',
        'M5.5 5.5 L12.5 5.5 L13 6 L13 7 L12.5 7.5 L6.5 7.5 L6.5 17.5 L16.5 17.5 L16.5 11.5 L17 11 L18 11 L18.5 11.5 L18.5 18.5 L17.5 19.5 L5.5 19.5 L4.5 18.5 L4.5 6.5Z',
        'M5.5 5.5 L12.5 5.5 L13 6 L13 7 L12.5 7.5 L6.5 7.5 L6.5 17.5 L16.5 17.5 L16.5 11.5 L17 11 L18 11 L18.5 11.5 L18.5 18.5 L17.5 19.5 L5.5 19.5 L4.5 18.5 L4.5 6.5Z',
      ],
      times: [0, 0.25, 0.48, 0.8, 1],
    },
    {
      path: 1,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '-0.25 0.25', '1.2 -1.2', '0 0', '0 0'],
      times: [0, 0.25, 0.48, 0.8, 1],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M5.5 5.5h7l.5.5v1l-.5.5h-6v10h10v-6l.5-.5h1l.5.5v7l-1 1h-12l-1-1v-12z' },
  {
    d: 'M14.5 4.5h5l1 1v5l-.5.5h-1l-.5-.5V7.91l-4.79 4.8h-1.42l-.5-.5v-1.42l4.8-4.79H14.5l-.5-.5V5z',
  },
] as const;

export type ExternalLinkIconProps = IconProps & { animated?: IconAnimation };

export const ExternalLinkIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ExternalLinkIconProps>(
  function ExternalLinkIcon({ size = 24, animated, ...props }: ExternalLinkIconProps, ref) {
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
            <path d={'M5.5 5.5h7l.5.5v1l-.5.5h-6v10h10v-6l.5-.5h1l.5.5v7l-1 1h-12l-1-1v-12z'} />
            <path
              d={
                'M14.5 4.5h5l1 1v5l-.5.5h-1l-.5-.5V7.91l-4.79 4.8h-1.42l-.5-.5v-1.42l4.8-4.79H14.5l-.5-.5V5z'
              }
            />
          </>
        )}
      </svg>
    );
  },
);
ExternalLinkIcon.displayName = 'ExternalLinkIcon';
