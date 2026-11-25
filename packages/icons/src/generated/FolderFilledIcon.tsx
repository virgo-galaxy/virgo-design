/* This file is generated from icons/folder-filled.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type FolderFilledIconProps = IconProps;

export const FolderFilledIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, FolderFilledIconProps>(
  function FolderFilledIcon({ size = 24, ...props }: FolderFilledIconProps, ref) {
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
          d={'M3 4h6.5L12 6.5h9l1 1V19l-1 1H3l-1-1V5z M5.5 9.75h13v1.5h-13z'}
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
FolderFilledIcon.displayName = 'FolderFilledIcon';
