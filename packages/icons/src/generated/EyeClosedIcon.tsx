/* This file is generated from icons/eye-closed.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

export type EyeClosedIconProps = Omit<
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

export const EyeClosedIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, EyeClosedIconProps>(
  function EyeClosedIcon({ size = 24, ...props }: EyeClosedIconProps, ref) {
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
            'M2 10 3.5 8.5C5.75 12.25 8.25 14 12 14s6.25-1.75 8.5-5.5L22 10c-2.5 4-5.5 6-10 6S4.5 14 2 10Z'
          }
        />
        <path
          d={
            'm5 12 1.5 1.5-2.25 3H3.5l-.75-.75v-.5z M11 15h2v3.5l-.5.5h-1l-.5-.5z M19 12l2.25 3.25v.5l-.75.75h-.75l-2.25-3z'
          }
        />
      </svg>
    );
  },
);
EyeClosedIcon.displayName = 'EyeClosedIcon';
