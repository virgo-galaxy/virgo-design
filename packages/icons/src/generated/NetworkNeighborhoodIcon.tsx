/* This file is generated from icons/network-neighborhood.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type NetworkNeighborhoodIconProps = IconProps;

export const NetworkNeighborhoodIcon = /* @__PURE__ */ forwardRef<
  SVGSVGElement,
  NetworkNeighborhoodIconProps
>(function NetworkNeighborhoodIcon({ size = 24, ...props }: NetworkNeighborhoodIconProps, ref) {
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
      <path d={'M3 3h9l1 1v6l-1 1H3l-1-1V4z M4 5v4h7V5z'} fillRule="evenodd" />
      <path d={'M12 12h9l1 1v6l-1 1h-9l-1-1v-6z M13 14v4h7v-4z'} fillRule="evenodd" />
      <path
        d={
          'M13 6h4.5L19 7.5V12h-2V8h-4z M6.5 11h2v2h.75l.5.5v.5l-.5.5h-3.5l-.5-.5v-.5l.5-.5h.75z M15.5 20h2v1h.75l.5.5v.5l-.5.5h-3.5l-.5-.5v-.5l.5-.5h.75z'
        }
      />
    </svg>
  );
});
NetworkNeighborhoodIcon.displayName = 'NetworkNeighborhoodIcon';
