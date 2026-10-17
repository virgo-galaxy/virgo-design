import {
  Select as SelectRoot,
  SelectContent,
  SelectMultiple,
  SelectOption,
  SelectRemove,
  SelectTrigger,
} from './Select';

export const Select = Object.assign(SelectRoot, {
  Multiple: SelectMultiple,
  Remove: SelectRemove,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Option: SelectOption,
});

export { useSelectState } from './Select';
export type {
  SelectContentProps,
  SelectMultipleProps,
  SelectOptionProps,
  SelectProps,
  SelectRemoveProps,
  SelectState,
  SelectTriggerProps,
} from './Select.types';
