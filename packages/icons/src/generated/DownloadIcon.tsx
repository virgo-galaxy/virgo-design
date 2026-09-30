/* This file is generated from icons/download.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';

const animation = {
  duration: 1200,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '0 1.5', '0 0', '0 0'],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M11 3h2v9.586l3.293-3.293 1.414 1.414L12 16.414l-5.707-5.707 1.414-1.414L11 12.586V3Z' },
  { d: 'M3 16h2v3h14v-3h2v4l-1 1H4l-1-1v-4Z' },
] as const;

export type DownloadIconProps = Omit<
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

export const DownloadIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, DownloadIconProps>(
  function DownloadIcon({ size = 24, animated, ...props }: DownloadIconProps, ref) {
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
                'M11 3h2v9.586l3.293-3.293 1.414 1.414L12 16.414l-5.707-5.707 1.414-1.414L11 12.586V3Z'
              }
            />
            <path d={'M3 16h2v3h14v-3h2v4l-1 1H4l-1-1v-4Z'} />
          </>
        )}
      </svg>
    );
  },
);
DownloadIcon.displayName = 'DownloadIcon';
