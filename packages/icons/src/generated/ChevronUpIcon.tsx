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
      <path
        d={
          'M19.25 15.75l-.5.5h-.5l-6-6h-.5l-6 6h-.5l-.5-.5-.5-.5v-.5l.5-.5L11.3 7.7h1.4l6.55 6.55.5.5v.5z'
        }
      />
    </svg>
  );
}
