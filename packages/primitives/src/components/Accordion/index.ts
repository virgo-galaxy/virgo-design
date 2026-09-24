import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from './Accordion';

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

export type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionMultipleProps,
  AccordionProps,
  AccordionRootProps,
  AccordionSingleProps,
  AccordionTriggerProps,
} from './Accordion.types';
