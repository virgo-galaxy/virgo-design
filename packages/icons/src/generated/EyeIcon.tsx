/* This file is generated from icons/eye.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type EyeIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function EyeIcon({ size = 24, ...props }: EyeIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M2 12C4.5 8 7.5 6 12 6s7.5 2 10 6c-2.5 4-5.5 6-10 6S4.5 16 2 12Z M4.5 12c2 2.75 4.25 4 7.5 4s5.5-1.25 7.5-4c-2-2.75-4.25-4-7.5-4S6.5 9.25 4.5 12Z'
        }
        fillRule="evenodd"
      />
      <path d={'M12 9.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z'} />
    </svg>
  );
}
