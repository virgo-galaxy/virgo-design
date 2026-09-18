/* This file is generated from icons/chevron-down.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type ChevronDownIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function ChevronDownIcon({ size = 24, ...props }: ChevronDownIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d={'M4.75 7.75h1l6 6h.5l6-6h1l.5.5v1l-7.05 7.05h-1.4L4.25 9.25v-1z'} />
    </svg>
  );
}
