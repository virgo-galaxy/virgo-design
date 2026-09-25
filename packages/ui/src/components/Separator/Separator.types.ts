import type { HTMLAttributes } from 'react';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Layout and semantic direction. @default 'horizontal' */
  orientation?: SeparatorOrientation;
  /** Removes separator semantics for a purely visual rule. @default false */
  decorative?: boolean;
}
