/* This file is generated from icons/ellipsis-vertical.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type EllipsisVerticalIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function EllipsisVerticalIcon({ size = 24, ...props }: EllipsisVerticalIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d={'M14 5 13 6.732 11 6.732 10 5 11 3.268 13 3.268Z'} />
      <path d={'M14 12 13 13.732 11 13.732 10 12 11 10.268 13 10.268Z'} />
      <path d={'M14 19 13 20.732 11 20.732 10 19 11 17.268 13 17.268Z'} />
    </svg>
  );
}
