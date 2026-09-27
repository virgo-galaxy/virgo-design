/* This file is generated from icons/external-link.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type ExternalLinkIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function ExternalLinkIcon({ size = 24, ...props }: ExternalLinkIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d={'M5.5 5.5h7l.5.5v1l-.5.5h-6v10h10v-6l.5-.5h1l.5.5v7l-1 1h-12l-1-1v-12z'} />
      <path
        d={
          'M14.5 4.5h5l1 1v5l-.5.5h-1l-.5-.5V7.91l-7.29 7.3h-1.42l-.5-.5v-1.42l7.3-7.29H14.5l-.5-.5V5z'
        }
      />
    </svg>
  );
}
