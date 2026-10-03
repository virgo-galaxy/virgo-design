/* This file is generated from icons/form.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type FormIconProps = IconProps;

export const FormIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, FormIconProps>(function FormIcon(
  { size = 24, ...props }: FormIconProps,
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
      <path d={'M4 2h16l1 1v18l-1 1H4l-1-1V3z M5 4v16h14V4z'} fillRule="evenodd" />
      <path d={'M7 5.5h7l.5.5v1l-.5.5H7L6.5 7V6z M7 9h2v2H7z M7 15h2v2H7z'} />
      <path
        d={'M11 8.5h6v4h-6z M12.5 10v1h3v-1z M11 14.5h6v4h-6z M12.5 16v1h3v-1z'}
        fillRule="evenodd"
      />
    </svg>
  );
});
FormIcon.displayName = 'FormIcon';
