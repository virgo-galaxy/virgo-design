import { Tooltip as Root, TooltipContent, TooltipTrigger } from './Tooltip';

export const Tooltip = Object.assign(Root, { Trigger: TooltipTrigger, Content: TooltipContent });
export type {
  TooltipContentProps,
  TooltipPlacement,
  TooltipProps,
  TooltipTriggerProps,
} from './Tooltip.types';
