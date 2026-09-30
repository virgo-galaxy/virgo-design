/* This file is generated from icons/sidebar-expand.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type SidebarExpandIconProps = IconProps;

export const SidebarExpandIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, SidebarExpandIconProps>(
  function SidebarExpandIcon({ size = 24, ...props }: SidebarExpandIconProps, ref) {
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
            'M4 4.5h16l.5.5v1l-.5.5H4L3.5 6V5z M11 9h9l.5.5v1l-.5.5h-9l-.5-.5v-1z M11 13h9l.5.5v1l-.5.5h-9l-.5-.5v-1z M4 17.5h16l.5.5v1l-.5.5H4l-.5-.5v-1z'
          }
        />
        <path d={'M4 8.5h.5l4 3v1l-4 3H4l-.5-.5V9z'} />
      </svg>
    );
  },
);
SidebarExpandIcon.displayName = 'SidebarExpandIcon';
