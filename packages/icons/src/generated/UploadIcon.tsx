/* This file is generated from icons/upload.svg by scripts/generate.ts. Do not edit. */
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
      values: ['0 0', '0 -1.5', '0 0', '0 0'],
    },
  ],
} as const;
const animationPaths = [
  { d: 'm12 2.586 5.707 5.707-1.414 1.414L13 6.414V16h-2V6.414L7.707 9.707 6.293 8.293 12 2.586Z' },
  { d: 'M3 16h2v3h14v-3h2v4l-1 1H4l-1-1v-4Z' },
] as const;

export type UploadIconProps = Omit<
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

export const UploadIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, UploadIconProps>(
  function UploadIcon({ size = 24, animated, ...props }: UploadIconProps, ref) {
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
                'm12 2.586 5.707 5.707-1.414 1.414L13 6.414V16h-2V6.414L7.707 9.707 6.293 8.293 12 2.586Z'
              }
            />
            <path d={'M3 16h2v3h14v-3h2v4l-1 1H4l-1-1v-4Z'} />
          </>
        )}
      </svg>
    );
  },
);
UploadIcon.displayName = 'UploadIcon';
