/* This file is generated from icons/user.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type UserIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function UserIcon({ size = 24, ...props }: UserIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z'}
        fillRule="evenodd"
      />
      <path
        d={
          'M4 20v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0Z'
        }
      />
    </svg>
  );
}
