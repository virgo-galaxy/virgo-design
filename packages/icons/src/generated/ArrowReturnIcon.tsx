/* This file is generated from icons/arrow-return.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

export type ArrowReturnIconProps = Omit<
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

export const ArrowReturnIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, ArrowReturnIconProps>(
  function ArrowReturnIcon({ size = 24, ...props }: ArrowReturnIconProps, ref) {
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
            'M8.75 2.75h1l.5.5v1L6 7.5h8.5C19 7.5 21.5 10 21.5 14.5S19 21.5 14.5 21.5H5l-.5-.5v-1l.5-.5h9.5c3.3 0 5-1.7 5-5s-1.7-5-5-5H6l4.25 3.75v1l-.5.5h-1L2.5 8.75v-1.5z'
          }
        />
      </svg>
    );
  },
);
ArrowReturnIcon.displayName = 'ArrowReturnIcon';
