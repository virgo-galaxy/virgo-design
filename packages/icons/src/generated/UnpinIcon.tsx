/* This file is generated from icons/unpin.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

export type UnpinIconProps = Omit<
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

export const UnpinIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, UnpinIconProps>(
  function UnpinIcon({ size = 24, ...props }: UnpinIconProps, ref) {
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
            'M13.96 16.36 12.362 16.107 11.658 20.552 10.514 21.383 9.683 20.239 10.387 15.794 6.436 15.169 5.605 14.024 5.761 13.037 8.585 10.985Z M10.104 12.504 8.724 13.506 11.554 13.954Z M9.457 2.485 17.359 3.737 18.19 4.881 18.033 5.868 15.745 7.531 15.119 11.482 17.613 14.914 17.572 15.172 9.706 7.306 9.819 6.592 8.157 4.304 8.313 3.316Z M11.041 5.267 11.873 6.411 11.454 9.054 13.202 10.802 13.848 6.724 14.992 5.893Z'
          }
          fillRule="evenodd"
        />
        <path d={'M4 3h.5L21 19.5v.5L20 21h-.5L3 4.5V4z'} />
      </svg>
    );
  },
);
UnpinIcon.displayName = 'UnpinIcon';
