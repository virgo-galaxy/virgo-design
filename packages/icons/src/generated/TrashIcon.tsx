/* This file is generated from icons/trash.svg by scripts/generate.ts. Do not edit. */
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
      values: ['0 18.5 7.5', '12 18.5 7.5', '0 18.5 7.5', '0 18.5 7.5'],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M10.5 3h3l.5.5v2h4.5l.5.5v1.5H5V6l.5-.5H10v-2z' },
  { d: 'M6 8.5h2v10l.5.5h7l.5-.5v-10h2V20l-1 1H7l-1-1z' },
  { d: 'M10.25 10h.25l.5.5V17l-.5.5h-.25l-.5-.5v-6.5zm3.25 0h.25l.5.5V17l-.5.5h-.25L13 17v-6.5z' },
] as const;

export type TrashIconProps = IconProps & { animated?: IconAnimation };

export const TrashIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, TrashIconProps>(
  function TrashIcon({ size = 24, animated, ...props }: TrashIconProps, ref) {
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
            <path d={'M10.5 3h3l.5.5v2h4.5l.5.5v1.5H5V6l.5-.5H10v-2z'} />
            <path d={'M6 8.5h2v10l.5.5h7l.5-.5v-10h2V20l-1 1H7l-1-1z'} />
            <path
              d={
                'M10.25 10h.25l.5.5V17l-.5.5h-.25l-.5-.5v-6.5zm3.25 0h.25l.5.5V17l-.5.5h-.25L13 17v-6.5z'
              }
            />
          </>
        )}
      </svg>
    );
  },
);
TrashIcon.displayName = 'TrashIcon';
