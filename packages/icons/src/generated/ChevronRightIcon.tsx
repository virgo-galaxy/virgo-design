/* This file is generated from icons/chevron-right.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type ChevronRightIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function ChevronRightIcon({ size = 24, ...props }: ChevronRightIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d={'M7.75 19.25v-1l6-6v-.5l-6-6v-1l.5-.5h1l7.05 7.05v1.4l-7.05 7.05h-1z'} />
    </svg>
  );
}
