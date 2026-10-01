import {
  StepsDescription,
  StepsIndicator,
  StepsItem,
  StepsRoot as Root,
  StepsTitle,
  StepsTrigger,
} from './Steps';
export const Steps = Object.assign(Root, {
  Root,
  Item: StepsItem,
  Trigger: StepsTrigger,
  Indicator: StepsIndicator,
  Title: StepsTitle,
  Description: StepsDescription,
});
export type {
  StepsDescriptionProps,
  StepsIndicatorProps,
  StepsItemProps,
  StepsProps,
  StepsTitleProps,
  StepsTriggerProps,
} from './Steps.types';
