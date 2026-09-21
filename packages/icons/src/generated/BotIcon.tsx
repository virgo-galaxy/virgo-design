/* This file is generated from icons/bot.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type BotIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function BotIcon({ size = 24, ...props }: BotIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={'M11.5 3h1l.5.5V6h5l1 1v10.5l-2 2h-10l-2-2V7l1-1h5V3.5z M7 8v8.75l.75.75h8.5l.75-.75V8z'}
        fillRule="evenodd"
      />
      <path
        d={
          'M8 11h3v1.5H8z M13 11h3v1.5h-3z M3 10.5h1.5v4H3l-.5-.5v-3z M19.5 10.5H21l.5.5v3l-.5.5h-1.5z'
        }
      />
    </svg>
  );
}
