/* This file is generated from icons/triangle-alert.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type TriangleAlertIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function TriangleAlertIcon({ size = 24, ...props }: TriangleAlertIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={'M11.5 3h1L22 19.5 21 21H3l-1-1.5L11.5 3ZM12 6.5 5 19h14L12 6.5Z'}
        fillRule="evenodd"
      />
      <path d={'M11.5 10h1l.5.5v4l-.5.5h-1l-.5-.5v-4zM11.5 16.5h1l.5.5v.5l-.5.5h-1L11 17.5V17z'} />
    </svg>
  );
}
