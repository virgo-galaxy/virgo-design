/* This file is generated from icons/search.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type SearchIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function SearchIcon({ size = 24, ...props }: SearchIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M10 3.75a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 2.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Z'
        }
        fillRule="evenodd"
      />
      <path d={'M15.2 14.55l1.4-1.4 4.4 4.4v1.4l-1.4 1.4h-1.4z'} />
    </svg>
  );
}
