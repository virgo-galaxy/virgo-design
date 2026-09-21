/* This file is generated from icons/chevrons-down.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type ChevronsDownIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function ChevronsDownIcon({ size = 24, ...props }: ChevronsDownIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M4.75 4.25h1l6 6h.5l6-6h1l.5.5v1l-7.05 7.05h-1.4L4.25 5.75v-1z M4.75 11.25h1l6 6h.5l6-6h1l.5.5v1l-7.05 7.05h-1.4L4.25 12.75v-1z'
        }
      />
    </svg>
  );
}
