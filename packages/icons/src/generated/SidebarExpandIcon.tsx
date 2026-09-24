/* This file is generated from icons/sidebar-expand.svg by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type SidebarExpandIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
};

export function SidebarExpandIcon({ size = 24, ...props }: SidebarExpandIconProps) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d={
          'M4 4.5h16l.5.5v1l-.5.5H4L3.5 6V5z M11 9h9l.5.5v1l-.5.5h-9l-.5-.5v-1z M11 13h9l.5.5v1l-.5.5h-9l-.5-.5v-1z M4 17.5h16l.5.5v1l-.5.5H4l-.5-.5v-1z'
        }
      />
      <path d={'M4 8.5h.5l4 3v1l-4 3H4l-.5-.5V9z'} />
    </svg>
  );
}
