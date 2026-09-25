/* This file is generated from icons/circle-x.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type CircleXIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function CircleXIcon({ size = 24, ...props }: CircleXIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z'}
        fillRule="evenodd"
      />
      <path
        d={
          'M8 7.5h.5L12 11l3.5-3.5h.5l.5.5v.5L13 12l3.5 3.5v.5l-.5.5h-.5L12 13l-3.5 3.5H8l-.5-.5v-.5L11 12 7.5 8.5V8z'
        }
      />
    </svg>
  );
}
