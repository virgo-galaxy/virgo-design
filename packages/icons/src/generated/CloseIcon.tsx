/* This file is generated from icons/close.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type CloseIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function CloseIcon({ size = 24, ...props }: CloseIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M5 5.875 5.875 5h.525L12 10.6 17.6 5h.525l.875.875V6.4L13.4 12l5.6 5.6v.525l-.875.875H17.6L12 13.4 6.4 19h-.525L5 18.125V17.6l5.6-5.6L5 6.4z'
        }
      />
    </svg>
  );
}
