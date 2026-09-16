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
      <path
        d={
          'M4.75 8.25l.5-.5h.5l6 6h.5l6-6h.5l.5.5.5.5v.5l-.5.5-6.55 6.55h-1.4L4.75 9.75l-.5-.5v-.5z'
        }
      />
    </svg>
  );
}
