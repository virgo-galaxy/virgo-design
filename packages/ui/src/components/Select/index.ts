import {
  Select as SelectRoot,
  SelectContent,
  SelectMultiple,
  SelectOption,
  SelectTrigger,
} from './Select';

export const Select = Object.assign(SelectRoot, {
  Multiple: SelectMultiple,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Option: SelectOption,
});

export type {
  SelectContentProps,
  SelectMultipleProps,
  SelectOptionProps,
  SelectProps,
  SelectSize,
  SelectTriggerProps,
} from './Select.types';
