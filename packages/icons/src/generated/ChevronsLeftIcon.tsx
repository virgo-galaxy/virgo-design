/* This file is generated from icons/chevrons-left.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type ChevronsLeftIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function ChevronsLeftIcon({ size = 24, ...props }: ChevronsLeftIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M19.75 19.25v-1l-6-6v-.5l6-6v-1l-.5-.5h-1l-7.05 7.05v1.4l7.05 7.05h1z M12.75 19.25v-1l-6-6v-.5l6-6v-1l-.5-.5h-1L4.2 11.3v1.4l7.05 7.05h1z'
        }
      />
    </svg>
  );
}
