/* This file is generated from icons/sun.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type SunIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function SunIcon({ size = 24, ...props }: SunIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d={'M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z'} />
      <path
        d={
          'M11 2h2v3h-2zM11 19h2v3h-2zM2 11h3v2H2zM19 11h3v2h-3zM4.222 5.636l1.414-1.414 2.121 2.121-1.414 1.414zM16.243 6.343l2.121-2.121 1.414 1.414-2.121 2.121zM4.222 18.364l2.121-2.121 1.414 1.414-2.121 2.121zM16.243 17.657l1.414-1.414 2.121 2.121-1.414 1.414z'
        }
      />
    </svg>
  );
}
