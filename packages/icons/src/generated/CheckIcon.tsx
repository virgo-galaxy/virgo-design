/* This file is generated from icons/check.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type CheckIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function CheckIcon({ size = 24, ...props }: CheckIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M4.75 11.25l.5-.5h.5L10 15l8.5-8.5h.5l.5.5.5.5v.5l-.5.5-8.8 8.8H9.3l-4.55-4.55-.5-.5v-.5z'
        }
      />
    </svg>
  );
}
