/* This file is generated from icons/plus.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type PlusIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function PlusIcon({ size = 24, ...props }: PlusIconProps) {
  return (
    <svg
      fill="currentColor"
      height={size}
      stroke="none"
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <path
        d={'M11.5 3.5h1l.5 .5v7h7l.5 .5v1l-.5 .5h-7v7l-.5 .5h-1l-.5-.5v-7H4l-.5-.5v-1l.5-.5h7V4z'}
      />
    </svg>
  );
}
