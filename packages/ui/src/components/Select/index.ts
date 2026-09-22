import { Select as SelectRoot, SelectContent, SelectOption, SelectTrigger } from './Select';

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Option: SelectOption,
});

export type {
  SelectContentProps,
  SelectOptionProps,
  SelectProps,
  SelectSize,
  SelectTriggerProps,
} from './Select.types';
