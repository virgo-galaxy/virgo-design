import type {
  CollapsibleContentProps as PrimitiveContentProps,
  CollapsibleTriggerProps as PrimitiveTriggerProps,
} from '@virgo-design/primitives';
import type { ReactNode } from 'react';
export type { CollapsibleProps, CollapsibleRootProps } from '@virgo-design/primitives';
export interface CollapsibleContentProps extends PrimitiveContentProps {
  /** Intrinsic-height expansion and collapse. Collapse retains closed content as inert for reversible transitions. @default 'none' */
  motion?: 'none' | 'collapse';
}
export interface CollapsibleTriggerProps extends PrimitiveTriggerProps {
  /** Custom decorative indicator; null hides it. */
  indicator?: ReactNode;
}
