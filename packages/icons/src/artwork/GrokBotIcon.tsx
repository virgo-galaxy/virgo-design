/* Generated from artwork/grok-bot.svg. Do not edit. */
import { forwardRef, useId } from 'react';

import type { IconProps } from '../icon-props.js';
export type GrokBotIconProps = IconProps;
export const GrokBotIcon = forwardRef<SVGSVGElement, GrokBotIconProps>(function GrokBotIcon(
  { size = 24, ...props },
  ref,
) {
  const id = useId();
  const cap = id + '-cap';
  const shell = id + '-shell';
  const eye = id + '-eye';
  return (
    <svg
      {...props}
      ref={ref}
      viewBox="8.25 8.25 112.1 113.5"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={cap} x1="38" y1="9" x2="90" y2="83" gradientUnits="userSpaceOnUse">
          <stop stopColor="#373737" />
          <stop offset=".5" stopColor="#242424" />
          <stop offset="1" stopColor="#111" />
        </linearGradient>
        <radialGradient
          id={shell}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(88 46) rotate(133) scale(100 108)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset=".42" stopColor="#f0f0f0" />
          <stop offset=".76" stopColor="#d5d5d5" />
          <stop offset="1" stopColor="#aaa" />
        </radialGradient>
        <linearGradient id={eye} x1="0" y1="0" x2="12" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#272929" />
          <stop offset="1" stopColor="#111313" />
        </linearGradient>
      </defs>
      <path
        d="M9 49C9 21 21 9 49 9h30c28 0 40 12 40 40v42c0 22-10 30-33 30H41C19 121 9 111 9 91Z"
        fill={`url(#${cap})`}
        stroke="#252525"
        strokeWidth="1.5"
      />
      <path
        d="M15 33C20 17 32 13 50 13h29c17 0 28 4 33 16"
        fill="none"
        stroke="#555"
        strokeOpacity=".4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 49C27 35 49 26 70 27c23 1 41 17 47 39 2 8 3 17 3 26 0 22-11 29-34 29H41C18 121 9 112 9 91Z"
        fill={`url(#${shell})`}
        stroke="#aaa"
        strokeWidth=".7"
      />
      <path
        d="M11 49C30 35 50 28 70 29c19 1 35 12 43 31"
        fill="none"
        stroke="#fff"
        strokeOpacity=".65"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 109c5 7 13 10 26 10h44c13 0 22-2 27-8"
        fill="none"
        stroke="#8c8c8c"
        strokeOpacity=".25"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <g transform="translate(49 57) rotate(-32 7 16)">
        <rect y="1" width="14" height="33" rx="7" fill="#fff" opacity=".7" />
        <rect width="14" height="32" rx="7" fill={`url(#${eye})`} />
      </g>
      <g transform="translate(81 44) rotate(-32 6 15)">
        <rect y="1" width="12" height="30" rx="6" fill="#fff" opacity=".7" />
        <rect width="12" height="29" rx="6" fill={`url(#${eye})`} />
      </g>
    </svg>
  );
});
GrokBotIcon.displayName = 'GrokBotIcon';
