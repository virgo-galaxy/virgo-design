/* This file is generated from icons/shapes.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type ShapesIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function ShapesIcon({ size = 24, ...props }: ShapesIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M11.5 2h1l5 8.5-.5 1h-10l-.5-1z M9.5 9.5h5L12 5.25z M3 13h7l.5.5v7l-.5.5H3l-.5-.5v-7z M4.5 15v4h4v-4z M17.5 12.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z M17.5 14.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z'
        }
        fillRule="evenodd"
      />
    </svg>
  );
}
