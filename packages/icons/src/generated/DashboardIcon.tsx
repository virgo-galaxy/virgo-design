/* This file is generated from icons/dashboard.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

export type DashboardIconProps = Omit<
  SVGProps<SVGSVGElement>,
  | 'stroke'
  | 'strokeLinecap'
  | 'strokeLinejoin'
  | 'strokeWidth'
  | 'viewBox'
  | 'fill'
  | 'width'
  | 'height'
  | 'children'
  | 'ref'
> & {
  size?: number;
};

export const DashboardIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, DashboardIconProps>(
  function DashboardIcon({ size = 24, ...props }: DashboardIconProps, ref) {
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
            'M4 3.5h6l.5.5v10l-.5.5H4l-.5-.5V4z M5.25 5.25v7.5h3.5v-7.5z M14 9.5h6l.5.5v10l-.5.5h-6l-.5-.5V10z M15.25 11.25v7.5h3.5v-7.5z'
          }
          fillRule="evenodd"
        />
        <path d={'M14 3.5h6l.5.5v2.5L20 7h-6l-.5-.5V4z M4 17h6l.5.5V20l-.5.5H4l-.5-.5v-2.5z'} />
      </svg>
    );
  },
);
DashboardIcon.displayName = 'DashboardIcon';
