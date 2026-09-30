/* This file is generated from icons/pause.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

export type PauseIconProps = Omit<
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

export const PauseIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, PauseIconProps>(
  function PauseIcon({ size = 24, ...props }: PauseIconProps, ref) {
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
        <path d={'M7 4.5h2l.5.5v14l-.5.5H7l-.5-.5V5z M15 4.5h2l.5.5v14l-.5.5h-2l-.5-.5V5z'} />
      </svg>
    );
  },
);
PauseIcon.displayName = 'PauseIcon';
