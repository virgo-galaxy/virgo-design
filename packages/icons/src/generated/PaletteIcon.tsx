/* This file is generated from icons/palette.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type PaletteIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function PaletteIcon({ size = 24, ...props }: PaletteIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M12 2a10 10 0 0 0 0 20h1a3 3 0 0 0 2.4-4.8l-.6-.8a.25.25 0 0 1 .2-.4h2a5 5 0 0 0 5-5c0-5-4.5-9-10-9z M12 4c4.5 0 8 3.2 8 7a3 3 0 0 1-3 3h-2a2.25 2.25 0 0 0-1.8 3.6l.6.8A1 1 0 0 1 13 20h-1a8 8 0 0 1 0-16z'
        }
        fillRule="evenodd"
      />
      <path
        d={
          'M10.5 5.5h2l.5.5v2l-.5.5h-2L10 8V6z M6 8h2l.5.5v2l-.5.5H6l-.5-.5v-2z M6 13h2l.5.5v2L8 16H6l-.5-.5v-2z M15 7.5h2l.5.5v2l-.5.5h-2l-.5-.5V8z'
        }
      />
    </svg>
  );
}
