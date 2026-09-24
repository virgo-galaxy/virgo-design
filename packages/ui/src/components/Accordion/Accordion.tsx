import { ChevronDownIcon } from '@virgo-design/icons';
import { Accordion as PrimitiveAccordion } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Accordion.module.scss';
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from './Accordion.types';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

const Root = forwardRef<HTMLDivElement, AccordionProps>(function AccordionRoot(
  { size = 'md', variant = 'default', className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveAccordion.Root
      {...props}
      ref={forwardedRef}
      className={classes(styles.root, className)}
      data-size={size}
      data-variant={variant}
    />
  );
});

Root.displayName = 'Accordion';

const Item = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveAccordion.Item
      {...props}
      ref={forwardedRef}
      className={classes(styles.item, className)}
    />
  );
});

Item.displayName = 'Accordion.Item';

const Trigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(function AccordionTrigger(
  { icon = false, render, className, children, ...props },
  forwardedRef,
) {
  if (render) {
    return (
      <PrimitiveAccordion.Trigger
        {...props}
        ref={forwardedRef}
        className={className}
        render={render}
      >
        {children}
      </PrimitiveAccordion.Trigger>
    );
  }

  return (
    <PrimitiveAccordion.Trigger
      {...props}
      ref={forwardedRef}
      className={classes(styles.trigger, className)}
    >
      <span className={styles.label} data-slot="label">
        {children}
      </span>
      {icon ? (
        <span className={styles.indicator} data-slot="indicator" aria-hidden="true">
          <ChevronDownIcon />
        </span>
      ) : null}
    </PrimitiveAccordion.Trigger>
  );
});

Trigger.displayName = 'Accordion.Trigger';

const Content = forwardRef<HTMLDivElement, AccordionContentProps>(function AccordionContent(
  { className, children, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveAccordion.Content
      {...props}
      ref={forwardedRef}
      className={classes(styles.content, className)}
    >
      <div className={styles.contentInner}>{children}</div>
    </PrimitiveAccordion.Content>
  );
});

Content.displayName = 'Accordion.Content';

export const Accordion = Object.assign(Root, {
  Root,
  Item,
  Trigger,
  Content,
});
