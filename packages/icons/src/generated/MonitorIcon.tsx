/* This file is generated from icons/monitor.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type MonitorIconProps = IconProps;

export const MonitorIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, MonitorIconProps>(
  function MonitorIcon({ size = 24, ...props }: MonitorIconProps, ref) {
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
        <path d={'M3 3h18l1 1v12l-1 1H3l-1-1V4z M4 5v10h16V5z'} fillRule="evenodd" />
        <path d={'M11 17h2v3h4l.5.5v1L17 22H7l-.5-.5v-1L7 20h4z'} />
      </svg>
    );
  },
);
MonitorIcon.displayName = 'MonitorIcon';
