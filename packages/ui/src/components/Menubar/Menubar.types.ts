import type { MenubarProps as PrimitiveProps } from '@virgo-design/primitives';

import type { ButtonSize } from '../Button';
export interface MenubarProps extends PrimitiveProps {
  size?: ButtonSize;
}
export type {
  MenubarContentProps,
  MenubarMenuProps,
  MenubarTriggerProps,
} from '@virgo-design/primitives';
