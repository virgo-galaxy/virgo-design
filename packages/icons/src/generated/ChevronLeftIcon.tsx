/* This file is generated from icons/chevron-left.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type ChevronLeftIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function ChevronLeftIcon({ size = 24, ...props }: ChevronLeftIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d={'M16.25 4.75v1l-6 6v.5l6 6v1l-.5.5h-1L7.7 12.7v-1.4l7.05-7.05h1z'} />
    </svg>
  );
}
