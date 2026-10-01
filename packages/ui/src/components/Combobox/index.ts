import {
  Combobox as ComboboxRoot,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxOption,
} from './Combobox';
export const Combobox = Object.assign(ComboboxRoot, {
  Root: ComboboxRoot,
  Input: ComboboxInput,
  Content: ComboboxContent,
  Option: ComboboxOption,
  Empty: ComboboxEmpty,
  Group: ComboboxGroup,
  Clear: ComboboxClear,
});
export type {
  ComboboxClearProps,
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxFilter,
  ComboboxGroupProps,
  ComboboxInputProps,
  ComboboxOptionProps,
  ComboboxProps,
} from './Combobox.types';
