/* This file is generated from icons/circle-check.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

export type CircleCheckIconProps = Omit<
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

export const CircleCheckIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, CircleCheckIconProps>(
  function CircleCheckIcon({ size = 24, ...props }: CircleCheckIconProps, ref) {
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
          d={'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z'}
          fillRule="evenodd"
        />
        <path d={'M7 11h.5l3 3 5.5-5.5h.5l1 1v.5l-6.5 6.5h-1L6 12.5V12z'} />
      </svg>
    );
  },
);
CircleCheckIcon.displayName = 'CircleCheckIcon';
