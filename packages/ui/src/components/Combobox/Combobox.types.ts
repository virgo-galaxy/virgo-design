import type { ComboboxProps as PrimitiveComboboxProps } from '@virgo-design/primitives';
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
  ComboboxInputProps,
  ComboboxOptionProps,
} from '@virgo-design/primitives';
