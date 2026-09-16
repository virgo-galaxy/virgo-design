/* This file is generated from icons/minus.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type MinusIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function MinusIcon({ size = 24, ...props }: MinusIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d={'M4 11h16l.5 .5v1l-.5 .5H4l-.5-.5v-1z'} />
    </svg>
  );
}
