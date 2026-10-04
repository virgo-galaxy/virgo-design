/* This file is generated from icons/edit.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type EditIconProps = IconProps;

export const EditIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, EditIconProps>(function EditIcon(
  { size = 24, ...props }: EditIconProps,
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
        d={'M5 14.5 14.5 5 19 9.5 9.5 19 3.5 20.5z M7 15.5l-1 2.5 2.5-1 7.5-7.5-1.5-1.5z'}
        fillRule="evenodd"
      />
      <path d={'m16 3.5 1.5-1.5L22 6.5 20.5 8z'} />
      <path d={'M6.5 20.5h6L16 17h1l1.5 4.5-1.5.5-1-3-2.5 3h-7z M19.5 20.5h3V22h-3z'} />
    </svg>
  );
});
EditIcon.displayName = 'EditIcon';
