/* This file is generated from icons/info.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type InfoIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function InfoIcon({ size = 24, ...props }: InfoIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm0 2a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Z'
        }
        fillRule="evenodd"
      />
      <path d={'M12 7.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z'} />
      <path d={'M11.5 11h1l.5.5V16l-.5.5h-1L11 16v-4.5z'} />
    </svg>
  );
}
