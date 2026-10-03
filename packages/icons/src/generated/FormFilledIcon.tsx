/* This file is generated from icons/form-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type FormFilledIconProps = IconProps;

export const FormFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, FormFilledIconProps>(
  function FormFilledIcon({ size = 24, ...props }: FormFilledIconProps, ref) {
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
            'M4 2h16l1 1v18l-1 1H4l-1-1V3z M7 5.5h7l.5.5v1l-.5.5H7L6.5 7V6z M7 9h2v2H7z M7 15h2v2H7z M11 8.5h6v4h-6z M11 14.5h6v4h-6z'
          }
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
FormFilledIcon.displayName = 'FormFilledIcon';
