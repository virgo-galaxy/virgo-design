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
      <path
        d={
          'M8.25 19.25l-.5-.5v-.5l6-6v-.5l-6-6v-.5l.5-.5.5-.5h.5l.5.5 6.55 6.55v1.4l-6.55 6.55-.5.5z'
        }
      />
    </svg>
  );
}
