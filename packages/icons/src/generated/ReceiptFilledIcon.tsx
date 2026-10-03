/* This file is generated from icons/receipt-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type ReceiptFilledIconProps = IconProps;

export const ReceiptFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ReceiptFilledIconProps>(
  function ReceiptFilledIcon({ size = 24, ...props }: ReceiptFilledIconProps, ref) {
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
          d={'M6 2h12l2 2v18l-4-2-4 2-4-2-4 2V4z M8 7h8v2H8z M8 11h6v2H8z'}
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
ReceiptFilledIcon.displayName = 'ReceiptFilledIcon';
