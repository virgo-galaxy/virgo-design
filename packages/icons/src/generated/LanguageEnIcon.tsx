/* This file is generated from icons/language-en.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type LanguageEnIconProps = IconProps;

export const LanguageEnIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, LanguageEnIconProps>(
  function LanguageEnIcon({ size = 24, ...props }: LanguageEnIconProps, ref) {
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
        <path d={'M3.35 5H10V7H5V11H9.5V13H5V17H10V19H3.35L3 18.65V5.35Z'} />
        <path d={'M12 19V5.35L12.35 5H14L19 14.5V5H20.65L21 5.35V18.65L20.65 19H19L14 9.5V19Z'} />
      </svg>
    );
  },
);
LanguageEnIcon.displayName = 'LanguageEnIcon';
