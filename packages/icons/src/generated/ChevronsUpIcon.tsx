/* This file is generated from icons/chevrons-up.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type ChevronsUpIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function ChevronsUpIcon({ size = 24, ...props }: ChevronsUpIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M19.25 19.75h-1l-6-6h-.5l-6 6h-1l-.5-.5v-1l7.05-7.05h1.4l7.05 7.05v1z M19.25 12.75h-1l-6-6h-.5l-6 6h-1l-.5-.5v-1L11.3 4.2h1.4l7.05 7.05v1z'
        }
      />
    </svg>
  );
}
