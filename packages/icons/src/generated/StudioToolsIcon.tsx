/* This file is generated from icons/studio-tools.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

export type StudioToolsIconProps = Omit<
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

export const StudioToolsIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, StudioToolsIconProps>(
  function StudioToolsIcon({ size = 24, ...props }: StudioToolsIconProps, ref) {
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
        <path d={'M4 3h10v2H5v14h14v-9h2v10l-1 1H4l-1-1V4z'} />
        <path d={'M12 7l5 5-5 5-5-5z M12 10l-2 2 2 2 2-2z'} fillRule="evenodd" />
        <path d={'M18 2h2v2h2v2h-2v2h-2V6h-2V4h2z'} />
      </svg>
    );
  },
);
StudioToolsIcon.displayName = 'StudioToolsIcon';
