/* This file is generated from icons/code.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';
import type { IconAnimation } from '../animation-contract.js';

const animation = {
  duration: 1400,
  tracks: [
    {
      path: 0,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '-1 0', '0 0', '0 0'],
    },
    {
      path: 1,
      attribute: 'transform',
      transform: 'translate',
      values: ['0 0', '1 0', '0 0', '0 0'],
    },
    { path: 2, attribute: 'opacity', values: ['1', '0', '1', '1'] },
  ],
} as const;
const animationPaths = [
  { d: 'M7 6.5h1l.5.5v1l-3.75 3.75v.5L8.5 16v1l-.5.5H7l-4.75-4.75v-1.5z' },
  { d: 'M17 6.5h-1l-.5.5v1l3.75 3.75v.5L15.5 16v1l.5.5h1l4.75-4.75v-1.5z' },
  { d: 'M13.5 3.5h1l.5.5-4.5 16-.5.5H9l-.5-.5L13 4z' },
] as const;

export type CodeIconProps = Omit<
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

export const CodeIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, CodeIconProps>(function CodeIcon(
  { size = 24, animated, ...props }: CodeIconProps,
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
          <path d={'M7 6.5h1l.5.5v1l-3.75 3.75v.5L8.5 16v1l-.5.5H7l-4.75-4.75v-1.5z'} />
          <path d={'M17 6.5h-1l-.5.5v1l3.75 3.75v.5L15.5 16v1l.5.5h1l4.75-4.75v-1.5z'} />
          <path d={'M13.5 3.5h1l.5.5-4.5 16-.5.5H9l-.5-.5L13 4z'} />
        </>
      )}
    </svg>
  );
});
CodeIcon.displayName = 'CodeIcon';
