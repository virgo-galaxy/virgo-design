/* This file is generated from icons/file-text.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type FileTextIconProps = IconProps;

export const FileTextIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, FileTextIconProps>(
  function FileTextIcon({ size = 24, ...props }: FileTextIconProps, ref) {
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
          d={'M5 2h9l6 6v13l-1 1H5l-1-1V3z M6 4v16h12V9h-5V4z M15 5.5V7h1.5z'}
          fillRule="evenodd"
        />
        <path d={'M8 11h8v2H8z M8 15h6v2H8z'} />
      </svg>
    );
  },
);
FileTextIcon.displayName = 'FileTextIcon';
