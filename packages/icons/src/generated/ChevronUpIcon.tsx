/* This file is generated from icons/chevron-up.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type ChevronUpIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function ChevronUpIcon({ size = 24, ...props }: ChevronUpIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d={'M19.25 16.25h-1l-6-6h-.5l-6 6h-1l-.5-.5v-1l7.05-7.05h1.4l7.05 7.05v1z'} />
    </svg>
  );
}
