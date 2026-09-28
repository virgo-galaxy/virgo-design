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
      <path
        d={
          'M8.648 3.648A9 9 0 1 0 20.352 15.352 9 9 0 0 1 8.648 3.648Z M6.074 8.274A7 7 0 0 0 15.726 17.926 11 11 0 0 1 6.074 8.274Z'
        }
        fillRule="evenodd"
      />
    </svg>
  );
}
