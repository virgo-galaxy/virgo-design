/* This file is generated from icons/play.svg by scripts/generate.ts. Do not edit. */
import { forwardRef, type SVGProps } from 'react';

export type PlayIconProps = Omit<
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

export const PlayIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, PlayIconProps>(function PlayIcon(
  { size = 24, ...props }: PlayIconProps,
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
      <path d={'M8 4.25h1l11 7.25v1L9 19.75H8l-.5-.5v-14z'} />
    </svg>
  );
});
PlayIcon.displayName = 'PlayIcon';
