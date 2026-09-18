/* This file is generated from icons/trash.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type TrashIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function TrashIcon({ size = 24, ...props }: TrashIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d={'M10.5 3h3l.5.5v2h4.5l.5.5v1.5H5V6l.5-.5H10v-2z'} />
      <path d={'M6 8.5h2v10l.5.5h7l.5-.5v-10h2V20l-1 1H7l-1-1z'} />
      <path
        d={
          'M10.25 10h.25l.5.5V17l-.5.5h-.25l-.5-.5v-6.5zm3.25 0h.25l.5.5V17l-.5.5h-.25L13 17v-6.5z'
        }
      />
    </svg>
  );
}
