/* This file is generated from icons/layers.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type LayersIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function LayersIcon({ size = 24, ...props }: LayersIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M11.5 2h1l9 4.5.5.75v1.5l-.5.75-9 4.5h-1l-9-4.5L2 8.75v-1.5l.5-.75z M5 8l7 3.5L19 8l-7-3.5z'
        }
        fillRule="evenodd"
      />
      <path
        d={
          'M2.5 11.5 12 16.25l9.5-4.75.5.5v1.5l-.5.5-9 4.5h-1l-9-4.5-.5-.5V12z M2.5 16 12 20.75 21.5 16l.5.5V18l-.5.5-9 4.5h-1l-9-4.5L2 18v-1.5z'
        }
      />
    </svg>
  );
}
