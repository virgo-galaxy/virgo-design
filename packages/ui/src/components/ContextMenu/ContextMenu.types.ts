import type { ContextMenuProps as PrimitiveProps } from '@virgo-design/primitives';

import type { ButtonSize } from '../Button';
/** Styled context menu for actions on the invoking object. */
export interface ContextMenuProps extends PrimitiveProps {
  /** Menu row density, inherited by nested menus. */
  size?: ButtonSize;
}
export type { ContextMenuContentProps, ContextMenuTriggerProps } from '@virgo-design/primitives';
