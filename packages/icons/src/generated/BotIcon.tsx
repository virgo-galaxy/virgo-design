/* This file is generated from icons/bot.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';

const animation = {
  duration: 1500,
  tracks: [
    {
      path: 2,
      attribute: 'transform',
      transform: 'rotate',
      values: ['0 12 6', '-18 12 6', '18 12 6', '0 12 6', '0 12 6'],
      times: [0, 0.25, 0.5, 0.8, 1],
    },
  ],
} as const;
const animationPaths = [
  {
    d: 'M13 6h5l1 1v10.5l-2 2h-10l-2-2V7l1-1z M7 8v8.75l.75.75h8.5l.75-.75V8z',
    fillRule: 'evenodd',
  },
  {
    d: 'M8 11h3v1.5H8z M13 11h3v1.5h-3z M3 10.5h1.5v4H3l-.5-.5v-3z M19.5 10.5H21l.5.5v3l-.5.5h-1.5z',
  },
  { d: 'M11.5 3h1l.5.5V6h-2V3.5z' },
] as const;

export type BotIconProps = Omit<
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

export const BotIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, BotIconProps>(function BotIcon(
  { size = 24, animated, ...props }: BotIconProps,
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
          <path
            d={'M13 6h5l1 1v10.5l-2 2h-10l-2-2V7l1-1z M7 8v8.75l.75.75h8.5l.75-.75V8z'}
            fillRule="evenodd"
          />
          <path
            d={
              'M8 11h3v1.5H8z M13 11h3v1.5h-3z M3 10.5h1.5v4H3l-.5-.5v-3z M19.5 10.5H21l.5.5v3l-.5.5h-1.5z'
            }
          />
          <path d={'M11.5 3h1l.5.5V6h-2V3.5z'} />
        </>
      )}
    </svg>
  );
});
BotIcon.displayName = 'BotIcon';
