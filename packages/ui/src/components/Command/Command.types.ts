import type {
  CommandEmptyProps as PrimitiveEmptyProps,
  CommandGroupProps as PrimitiveGroupProps,
  CommandInputProps as PrimitiveInputProps,
  CommandItemProps as PrimitiveItemProps,
  CommandListProps as PrimitiveListProps,
  CommandProps as PrimitiveProps,
  CommandSeparatorProps as PrimitiveSeparatorProps,
  DialogProps as PrimitiveDialogProps,
} from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export type CommandProps = PrimitiveProps;
export type CommandRootProps = CommandProps;
export type CommandInputProps = PrimitiveInputProps;
export type CommandListProps = PrimitiveListProps;
export type CommandEmptyProps = PrimitiveEmptyProps;
export type CommandGroupProps = PrimitiveGroupProps;
export type CommandSeparatorProps = PrimitiveSeparatorProps;

export interface CommandItemProps extends PrimitiveItemProps {
  /** Decorative leading icon. */
  icon?: ReactNode;
  /** Display-only key hint. It does not register a shortcut. */
  shortcut?: ReactNode;
}

export interface CommandDialogProps
  extends
    Pick<PrimitiveDialogProps, 'open' | 'defaultOpen' | 'onOpenChange' | 'modal' | 'children'>,
    Pick<
      PrimitiveProps,
      | 'search'
      | 'defaultSearch'
      | 'onSearchChange'
      | 'value'
      | 'defaultValue'
      | 'onValueChange'
      | 'shouldFilter'
      | 'filter'
    > {
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  'aria-label'?: string;
}
