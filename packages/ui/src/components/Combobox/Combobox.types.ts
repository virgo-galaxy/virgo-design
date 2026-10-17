import type {
  ComboboxInputProps as PrimitiveComboboxInputProps,
  ComboboxProps as PrimitiveComboboxProps,
} from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export interface ComboboxProps extends PrimitiveComboboxProps {
  /** Input and option density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}

export type {
  ComboboxClearProps,
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxFilter,
  ComboboxGroupProps,
  ComboboxOptionProps,
} from '@virgo-design/primitives';

export interface ComboboxInputProps extends Omit<PrimitiveComboboxInputProps, 'prefix'> {
  /** Decorative content placed before the native text control. */
  prefix?: ReactNode;
}
