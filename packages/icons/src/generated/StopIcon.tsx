/* This file is generated from icons/stop.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

export type StopIconProps = Omit<
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

export const StopIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, StopIconProps>(function StopIcon(
  { size = 24, ...props }: StopIconProps,
  ref,
) {
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
      <path d={'M6 5h12l1 1v12l-1 1H6l-1-1V6z'} />
    </svg>
  );
});
StopIcon.displayName = 'StopIcon';
