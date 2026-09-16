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
          'M5 5.5 5.5 5h.9L12 10.6 17.6 5h.9l.5.5v.9L13.4 12 19 17.6v.9l-.5.5h-.9L12 13.4 6.4 19h-.9l-.5-.5v-.9L10.6 12 5 6.4z'
        }
      />
    </svg>
  );
}
