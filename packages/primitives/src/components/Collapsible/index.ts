import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from './Collapsible';

export const Collapsible = Object.assign(CollapsibleRoot, {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
});

export type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleRootProps,
  CollapsibleTriggerProps,
} from './Collapsible.types';
