import type { SwitchProps as PrimitiveSwitchProps } from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export type SwitchAppearance = 'toggle' | 'fader';
export type SwitchSize = 'default' | 'small';

export interface SwitchProps extends Omit<PrimitiveSwitchProps, 'className'> {
  /** Standard pill toggle or console-style fader appearance. */
  appearance?: SwitchAppearance;

  /** Default and compact visual size. */
  size?: SwitchSize;

  /** Decorative content shown inside the toggle when checked. */
  checkedContent?: ReactNode;

  /** Decorative content shown inside the toggle when unchecked. */
  uncheckedContent?: ReactNode;

  /** Optional visible label rendered beside the switch control. */
  children?: ReactNode;

  /** Consumer class applied to the Switch root label. */
  className?: string;
}
