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
      <path
        d={
          'M15.75 4.75l.5.5v.5l-6 6v.5l6 6v.5l-.5.5-.5.5h-.5l-.5-.5-6.55-6.55v-1.4l6.55-6.55.5-.5z'
        }
      />
    </svg>
  );
}
