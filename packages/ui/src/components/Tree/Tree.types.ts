import type { TreeProps as PrimitiveTreeProps } from '@virgo-design/primitives';

export interface TreeProps extends PrimitiveTreeProps {
  /** Row density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}

export type {
  TreeGroupProps,
  TreeItemProps,
  TreeLabelProps,
  TreeToggleProps,
} from '@virgo-design/primitives';
