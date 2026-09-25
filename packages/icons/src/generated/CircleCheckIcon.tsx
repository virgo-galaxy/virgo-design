/* This file is generated from icons/circle-check.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type CircleCheckIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function CircleCheckIcon({ size = 24, ...props }: CircleCheckIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z'}
        fillRule="evenodd"
      />
      <path d={'M7 11h.5l3 3 5.5-5.5h.5l1 1v.5l-6.5 6.5h-1L6 12.5V12z'} />
    </svg>
  );
}
