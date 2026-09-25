/* This file is generated from icons/moon.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type MoonIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function MoonIcon({ size = 24, ...props }: MoonIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d={'M20.31 14.77A8.5 8.5 0 0 1 9.23 3.69 9 9 0 1 0 20.31 14.77Z'} />
    </svg>
  );
}
