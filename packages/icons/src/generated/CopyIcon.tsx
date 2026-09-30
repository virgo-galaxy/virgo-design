/* This file is generated from icons/copy.svg by scripts/generate.ts. Do not edit. */
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
      values: ['0 0', '-0.7 -0.7', '0 0', '0 0'],
    },
    {
      path: 1,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '0.7 0.7', '0 0', '0 0'],
    },
  ],
} as const;
const animationPaths = [
  { d: 'M3.5 2.5h12l1 1v2h-2v-1h-10v10h1v2h-2l-1-1v-12z' },
  {
    d: 'M8.5 7.5h12l1 1v12l-1 1h-12l-1-1v-12z M10 9.5l-.5.5v9l.5.5h9l.5-.5v-9l-.5-.5z',
    fillRule: 'evenodd',
  },
] as const;

export type CopyIconProps = Omit<
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

export const CopyIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, CopyIconProps>(function CopyIcon(
  { size = 24, animated, ...props }: CopyIconProps,
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
          <path d={'M3.5 2.5h12l1 1v2h-2v-1h-10v10h1v2h-2l-1-1v-12z'} />
          <path
            d={'M8.5 7.5h12l1 1v12l-1 1h-12l-1-1v-12z M10 9.5l-.5.5v9l.5.5h9l.5-.5v-9l-.5-.5z'}
            fillRule="evenodd"
          />
        </>
      )}
    </svg>
  );
});
CopyIcon.displayName = 'CopyIcon';
