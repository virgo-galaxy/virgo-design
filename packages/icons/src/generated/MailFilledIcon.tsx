/* This file is generated from icons/mail-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type MailFilledIconProps = IconProps;

export const MailFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, MailFilledIconProps>(
  function MailFilledIcon({ size = 24, ...props }: MailFilledIconProps, ref) {
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
          d={'M3 5h18l1 1v12l-1 1H3l-1-1V6z M4 7v1.4l7.5 5.8h1L20 8.4V7h-1.5L12 12 5.5 7z'}
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
MailFilledIcon.displayName = 'MailFilledIcon';
