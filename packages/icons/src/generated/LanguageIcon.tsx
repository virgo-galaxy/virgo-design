/* This file is generated from icons/language.svg by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

import type { IconProps } from '../icon-props.js';

export type LanguageIconProps = IconProps;

export const LanguageIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, LanguageIconProps>(
  function LanguageIcon({ size = 24, ...props }: LanguageIconProps, ref) {
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
        <path d={'M8 2H10V5H8ZM2.5 5H15.5V7H2.5Z'} />
        <path d={'M5 7H7.2L8.8 10.2 11.3 12.8 14 14.7 12.8 16.4 9.9 14.3 7.1 11.3Z'} />
        <path
          d={'M12.2 7H14.4L12.6 10.5 10.1 13.4 7 15.9 3.6 17.6 2.5 15.9 5.9 14.2 8.7 11.9 11 9.2Z'}
        />
        <path
          d={'M16.5 11H18.5L23 22H20.8L19.8 19.5H15.2L14.2 22H12ZM16 17.5H19L17.5 13.7Z'}
          fillRule="evenodd"
        />
      </svg>
    );
  },
);
LanguageIcon.displayName = 'LanguageIcon';
