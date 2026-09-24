import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, Ref } from 'react';

interface AccordionCommonProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  /** Heading level exposed by every item header. @default 3 */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

export interface AccordionSingleProps extends AccordionCommonProps {
  type: 'single';
  /** Controlled open item value. Use an empty string when every item is closed. */
  value?: string;
  /** Initially open item value for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the open item changes. */
  onValueChange?: (value: string) => void;
}

export interface AccordionMultipleProps extends AccordionCommonProps {
  type: 'multiple';
  /** Controlled open item values. */
  value?: readonly string[];
  /** Initially open item values for uncontrolled usage. */
  defaultValue?: readonly string[];
  /** Called when the open items change. */
  onValueChange?: (value: string[]) => void;
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;
export type AccordionRootProps = AccordionProps;

export interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'value'> {
  /** Stable value used to coordinate this item with the root. */
  value: string;
  /** Prevents this item from being toggled or reached by arrow-key navigation. */
  disabled?: boolean;
}

export interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render a custom button that forwards all supplied props and its ref. */
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}

export type AccordionContentProps = HTMLAttributes<HTMLDivElement>;
