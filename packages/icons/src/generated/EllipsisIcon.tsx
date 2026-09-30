/* This file is generated from icons/ellipsis.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

export type EllipsisIconProps = Omit<
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

export const EllipsisIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, EllipsisIconProps>(
  function EllipsisIcon({ size = 24, ...props }: EllipsisIconProps, ref) {
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
        <path d={'M7 12 6 13.732 4 13.732 3 12 4 10.268 6 10.268Z'} />
        <path d={'M14 12 13 13.732 11 13.732 10 12 11 10.268 13 10.268Z'} />
        <path d={'M21 12 20 13.732 18 13.732 17 12 18 10.268 20 10.268Z'} />
      </svg>
    );
  },
);
EllipsisIcon.displayName = 'EllipsisIcon';
