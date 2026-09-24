import type {
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from '@virgo-design/primitives';

import type { ButtonSize, ButtonVariant, IconOnlyButtonProps } from '../Button';

export type FloatingActionProps = Omit<IconOnlyButtonProps, 'iconOnly' | 'shape'>;
export type FloatingActionGroupProps = PopoverProps;
export interface FloatingActionTriggerProps extends PopoverTriggerProps {
  /** Required accessible name for the icon-only control. */
  'aria-label': string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}
export type FloatingActionContentProps = PopoverContentProps;
