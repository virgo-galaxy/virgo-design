/* This file is generated from icons/mail.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type MailIconProps = IconProps;

export const MailIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, MailIconProps>(function MailIcon(
  { size = 24, ...props }: MailIconProps,
  ref,
) {
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
        d={'M3 5h18l1 1v12l-1 1H3l-1-1V6z M5.5 7l6.5 5 6.5-5z M4 8.4v8.6h16V8.4l-7.5 5.8h-1z'}
        fillRule="evenodd"
      />
    </svg>
  );
});
MailIcon.displayName = 'MailIcon';
