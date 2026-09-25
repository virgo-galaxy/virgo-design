/* This file is generated from icons/type.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type TypeIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function TypeIcon({ size = 24, ...props }: TypeIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M4 3.5h16l.5.5v4l-.5.5h-1l-.5-.5V5.5H13v13h2.5l.5.5v1l-.5.5h-7L8 20v-1l.5-.5H11v-13H5.5V8l-.5.5H4L3.5 8V4z'
        }
      />
    </svg>
  );
}
