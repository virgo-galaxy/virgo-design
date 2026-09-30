/* This file is generated from icons/layout.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

export type LayoutIconProps = Omit<
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

export const LayoutIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, LayoutIconProps>(
  function LayoutIcon({ size = 24, ...props }: LayoutIconProps, ref) {
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
            'M4.5 4.5h15l1 1v13l-1 1h-15l-1-1v-13z M5.25 6.25V8h13.5V6.25z M5.25 9.5v8.25H8.5V9.5z M10 9.5v8.25h8.75V9.5z'
          }
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
LayoutIcon.displayName = 'LayoutIcon';
