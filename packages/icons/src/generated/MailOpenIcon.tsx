/* This file is generated from icons/mail-open.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type MailOpenIconProps = IconProps;

export const MailOpenIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, MailOpenIconProps>(
  function MailOpenIcon({ size = 24, ...props }: MailOpenIconProps, ref) {
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
            'M11.5 3h1l9.5 7v10l-1 1H3l-1-1V10z M4.5 10.6l7.5 5 7.5-5L12 5.1z M4 12.7V19h16v-6.3l-7.5 4.9h-1z'
          }
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
MailOpenIcon.displayName = 'MailOpenIcon';
