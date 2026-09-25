/* This file is generated from icons/circle-info.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type CircleInfoIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function CircleInfoIcon({ size = 24, ...props }: CircleInfoIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z'}
        fillRule="evenodd"
      />
      <path d={'M11.5 7h1l.5.5v1l-.5.5h-1l-.5-.5v-1zM11.5 11h1l.5.5v5l-.5.5h-1l-.5-.5v-5z'} />
    </svg>
  );
}
