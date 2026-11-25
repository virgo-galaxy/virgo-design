/* This file is generated from icons/folder.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type FolderIconProps = IconProps;

export const FolderIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, FolderIconProps>(
  function FolderIcon({ size = 24, ...props }: FolderIconProps, ref) {
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
          d={'M3 4h6.5L12 6.5h9l1 1V19l-1 1H3l-1-1V5z M4 6v12h16V8.5h-8.83L8.67 6z'}
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
FolderIcon.displayName = 'FolderIcon';
