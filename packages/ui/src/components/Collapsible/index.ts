import { CollapsibleContent, CollapsibleRoot as Root, CollapsibleTrigger } from './Collapsible';
export const Collapsible = Object.assign(Root, {
  Root,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
});
export type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleRootProps,
  CollapsibleTriggerProps,
} from './Collapsible.types';
