/* This file is generated from icons/monitor-plug.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';
import type { IconProps } from '../icon-props.js';

const animation = {
  duration: 900,
  tracks: [
    {
      path: 2,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '0 1.15', '-1.05 -1.75', '0 0', '0 0'],
      times: [0, 0.22, 0.5, 0.75, 1],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M3 3h18l1 1v4.5l-.5.5h-1l-.5-.5V5H4v10h5.5l.5.5v1l-.5.5H3l-1-1V4z' },
  { d: 'M7 17h2v3h2.5l.5.5v1l-.5.5h-7l-.5-.5v-1l.5-.5H7z' },
  {
    d: 'M13.75 10h1.75v3h3v-3h1.75v3h1l.75.75v.5l-.75.75h-.5v3l-2 2h-1v1.5l-.5.5h-1l-.5-.5V20h-1l-2-2v-3h-.5l-.75-.75v-.5l.75-.75h1.5z M14.75 15v2.2l.8.8h2.4l.8-.8V15z',
    fillRule: 'evenodd',
  },
] as const;

export type MonitorPlugIconProps = IconProps & { animated?: IconAnimation };

export const MonitorPlugIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, MonitorPlugIconProps>(
  function MonitorPlugIcon({ size = 24, animated, ...props }: MonitorPlugIconProps, ref) {
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
            <path d={'M3 3h18l1 1v4.5l-.5.5h-1l-.5-.5V5H4v10h5.5l.5.5v1l-.5.5H3l-1-1V4z'} />
            <path d={'M7 17h2v3h2.5l.5.5v1l-.5.5h-7l-.5-.5v-1l.5-.5H7z'} />
            <path
              d={
                'M13.75 10h1.75v3h3v-3h1.75v3h1l.75.75v.5l-.75.75h-.5v3l-2 2h-1v1.5l-.5.5h-1l-.5-.5V20h-1l-2-2v-3h-.5l-.75-.75v-.5l.75-.75h1.5z M14.75 15v2.2l.8.8h2.4l.8-.8V15z'
              }
              fillRule="evenodd"
            />
          </>
        )}
      </svg>
    );
  },
);
MonitorPlugIcon.displayName = 'MonitorPlugIcon';
