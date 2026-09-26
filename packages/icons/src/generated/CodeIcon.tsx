/* This file is generated from icons/code.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type CodeIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function CodeIcon({ size = 24, ...props }: CodeIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M7 6.5h1l.5.5v1l-3.75 3.75v.5L8.5 16v1l-.5.5H7l-4.75-4.75v-1.5z M17 6.5h-1l-.5.5v1l3.75 3.75v.5L15.5 16v1l.5.5h1l4.75-4.75v-1.5z'
        }
      />
      <path d={'M13.5 3.5h1l.5.5-4.5 16-.5.5H9l-.5-.5L13 4z'} />
    </svg>
  );
}
