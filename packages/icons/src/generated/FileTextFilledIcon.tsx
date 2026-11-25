/* This file is generated from icons/file-text-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type FileTextFilledIconProps = IconProps;

export const FileTextFilledIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  FileTextFilledIconProps
>(function FileTextFilledIcon({ size = 24, ...props }: FileTextFilledIconProps, ref) {
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
        d={'M5 2h9l6 6v13l-1 1H5l-1-1V3z M13 3.5V9h5.5z M8 11h8v2H8z M8 15h6v2H8z'}
        fillRule="evenodd"
      />
    </svg>
  );
});
FileTextFilledIcon.displayName = 'FileTextFilledIcon';
