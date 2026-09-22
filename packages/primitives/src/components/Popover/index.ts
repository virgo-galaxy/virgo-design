import { Popover as Root, PopoverClose, PopoverContent, PopoverTrigger } from './Popover';

export const Popover = Object.assign(Root, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose,
});
export type {
  PopoverCloseProps,
  PopoverContentProps,
  PopoverPlacement,
  PopoverProps,
  PopoverTriggerProps,
} from './Popover.types';
