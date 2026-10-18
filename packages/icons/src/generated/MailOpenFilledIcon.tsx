/* This file is generated from icons/mail-open-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type MailOpenFilledIconProps = IconProps;

export const MailOpenFilledIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  MailOpenFilledIconProps
>(function MailOpenFilledIcon({ size = 24, ...props }: MailOpenFilledIconProps, ref) {
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
        d={'M11.5 3h1l9.5 7v10l-1 1H3l-1-1V10z M4.5 10.6l7.5 5 7.5-5L12 5.1z'}
        fillRule="evenodd"
      />
    </svg>
  );
});
MailOpenFilledIcon.displayName = 'MailOpenFilledIcon';
