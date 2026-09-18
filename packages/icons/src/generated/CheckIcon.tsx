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
      <path d={'M4.875 10.75h.875L10 15l8.5-8.5h.875L20 7.125V8l-9.3 9.3H9.3l-5.05-5.05v-.875z'} />
    </svg>
  );
}
