/* This file is generated from icons/microphone.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type MicrophoneIconProps = IconProps;

export const MicrophoneIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, MicrophoneIconProps>(
  function MicrophoneIcon({ size = 24, ...props }: MicrophoneIconProps, ref) {
    return (
      <svg
        ref={ref}
        aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true}
        {...props}
        fill="currentColor"
        height={size}
        viewBox="0 0 24 24"
        width={size}
      >
        <path
          d={
            'M12 2.5a3.5 3.5 0 0 1 3.5 3.5v5a3.5 3.5 0 0 1-7 0V6A3.5 3.5 0 0 1 12 2.5Z M12 4.5A1.5 1.5 0 0 0 10.5 6v5a1.5 1.5 0 0 0 3 0V6A1.5 1.5 0 0 0 12 4.5Z'
          }
          fillRule="evenodd"
        />
        <path
          d={
            'M5.5 9h1l.5.5V11a5 5 0 0 0 10 0V9.5l.5-.5h1l.5.5V11a7 7 0 0 1-6 6.93V20h3l.5.5v1l-.5.5h-9l-.5-.5v-1l.5-.5h3v-2.07A7 7 0 0 1 5 11V9.5z'
          }
        />
      </svg>
    );
  },
);
MicrophoneIcon.displayName = 'MicrophoneIcon';
