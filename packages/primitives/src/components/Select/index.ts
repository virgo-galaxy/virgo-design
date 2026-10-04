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
export type {
  SelectContentProps,
  SelectMultipleProps,
  SelectOptionProps,
  SelectProps,
  SelectRemoveProps,
  SelectTriggerProps,
} from './Select.types';
