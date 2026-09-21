/* This file is generated from icons/globe.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type GlobeIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function GlobeIcon({ size = 24, ...props }: GlobeIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z'}
        fillRule="evenodd"
      />
      <path
        d={
          'M12 3c3 0 4.5 4 4.5 9s-1.5 9-4.5 9-4.5-4-4.5-9S9 3 12 3Z M12 5c-1.5 0-2.75 3-2.75 7s1.25 7 2.75 7 2.75-3 2.75-7S13.5 5 12 5Z'
        }
        fillRule="evenodd"
      />
      <path d={'M4 11h16v2H4z'} />
    </svg>
  );
}
