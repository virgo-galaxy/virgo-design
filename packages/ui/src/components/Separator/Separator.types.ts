import type { HTMLAttributes, ReactNode } from 'react';

export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorLabelAlign = 'start' | 'center' | 'end';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Layout and semantic direction. @default 'horizontal' */
  orientation?: SeparatorOrientation;
  /** Removes separator semantics for a purely visual rule. @default false */
  decorative?: boolean;
  /** Optional non-interactive label for a horizontal separator. */
  children?: ReactNode;
  /** Label position along a horizontal rule; start/end follow text direction. @default 'center' */
  labelAlign?: SeparatorLabelAlign;
}
