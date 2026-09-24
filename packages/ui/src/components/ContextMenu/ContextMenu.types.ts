import type { ContextMenuProps as PrimitiveProps } from '@virgo-design/primitives';

import type { ButtonSize } from '../Button';
export interface ContextMenuProps extends PrimitiveProps {
  size?: ButtonSize;
}
export type { ContextMenuContentProps, ContextMenuTriggerProps } from '@virgo-design/primitives';
