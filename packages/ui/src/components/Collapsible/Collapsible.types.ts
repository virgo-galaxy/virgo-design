import type { CollapsibleTriggerProps as PrimitiveTriggerProps } from '@virgo-design/primitives';
import type { ReactNode } from 'react';
export type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleRootProps,
} from '@virgo-design/primitives';
export interface CollapsibleTriggerProps extends PrimitiveTriggerProps {
  /** Custom decorative indicator; null hides it. */
  indicator?: ReactNode;
}
