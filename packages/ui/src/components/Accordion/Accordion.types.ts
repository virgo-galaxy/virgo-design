import type {
  AccordionContentProps as PrimitiveAccordionContentProps,
  AccordionItemProps as PrimitiveAccordionItemProps,
  AccordionProps as PrimitiveAccordionProps,
  AccordionTriggerProps as PrimitiveAccordionTriggerProps,
} from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export type AccordionSize = 'sm' | 'md' | 'lg';
export type AccordionVariant = 'default' | 'bordered' | 'ghost';

export type AccordionProps = PrimitiveAccordionProps & {
  /** Visual density shared by every item. @default 'md' */
  size?: AccordionSize;

  /** Theme Contract surface treatment. @default 'default' */
  variant?: AccordionVariant;
};

export type AccordionRootProps = AccordionProps;
export type AccordionItemProps = PrimitiveAccordionItemProps;

export interface AccordionTriggerProps extends Omit<PrimitiveAccordionTriggerProps, 'children'> {
  children?: ReactNode;

  /** Shows the default Virgo chevron indicator. @default false */
  icon?: boolean;
}

export type AccordionContentProps = PrimitiveAccordionContentProps;
