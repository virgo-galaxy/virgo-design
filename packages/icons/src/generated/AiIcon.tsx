/* This file is generated from icons/ai.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type AiIconProps = IconProps;

export const AiIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, AiIconProps>(function AiIcon(
  { size = 24, ...props }: AiIconProps,
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
      <path
        d={
          'M2.376 18.3 8.994 5.7 9.820 5 11.220 5 11.794 5.7 13.876 18.3 13.250 19 11.750 19 11.180 15.5 6.080 15.5 4.250 19 2.750 19ZM7.140 13.5 10.840 13.5 10.190 8.5 9.590 8.5Z'
        }
        fillRule="evenodd"
      />
      <path
        d={
          'M16.7 5H21.3L22 5.7V6.3L21.3 7H20V17H21.3L22 17.7V18.3L21.3 19H16.7L16 18.3V17.7L16.7 17H18V7H16.7L16 6.3V5.7Z'
        }
      />
    </svg>
  );
});
AiIcon.displayName = 'AiIcon';
