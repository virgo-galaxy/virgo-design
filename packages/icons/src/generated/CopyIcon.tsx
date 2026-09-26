/* This file is generated from icons/copy.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type CopyIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function CopyIcon({ size = 24, ...props }: CopyIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d={'M3.5 2.5h12l1 1v2h-2v-1h-10v10h1v2h-2l-1-1v-12z'} />
      <path
        d={'M8.5 7.5h12l1 1v12l-1 1h-12l-1-1v-12z M10 9.5l-.5.5v9l.5.5h9l.5-.5v-9l-.5-.5z'}
        fillRule="evenodd"
      />
    </svg>
  );
}
