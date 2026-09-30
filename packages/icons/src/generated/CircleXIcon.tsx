/* This file is generated from icons/circle-x.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

export type CircleXIconProps = Omit<
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

export const CircleXIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, CircleXIconProps>(
  function CircleXIcon({ size = 24, ...props }: CircleXIconProps, ref) {
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
        <path
          d={
            'M8 7.5h.5L12 11l3.5-3.5h.5l.5.5v.5L13 12l3.5 3.5v.5l-.5.5h-.5L12 13l-3.5 3.5H8l-.5-.5v-.5L11 12 7.5 8.5V8z'
          }
        />
      </svg>
    );
  },
);
CircleXIcon.displayName = 'CircleXIcon';
