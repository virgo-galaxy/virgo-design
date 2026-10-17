import { ChevronDownIcon } from '@virgo-design/icons';
import { Collapsible as PrimitiveCollapsible } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import { Button } from '../Button';
import styles from './Collapsible.module.scss';
import type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
} from './Collapsible.types';

const classes = (...values: Array<string | undefined>) => values.filter(Boolean).join(' ');

export const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleProps>(function Collapsible(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveCollapsible
      {...props}
      ref={ref}
      data-slot="root"
      className={classes(styles.root, className)}
    />
  );
});

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  function Trigger(
    { indicator = <ChevronDownIcon />, className, children, render, ...props },
    ref,
  ) {
    return (
      <PrimitiveCollapsible.Trigger
        {...props}
        ref={ref}
        data-slot="trigger"
        className={classes(styles.trigger, className)}
        render={
          render ??
          ((nativeProps) => (
            <Button variant="text" {...nativeProps}>
              {nativeProps.children}
            </Button>
          ))
        }
      >
        <span data-slot="text">{children}</span>
        <span data-slot="indicator" aria-hidden="true">
          {indicator}
        </span>
      </PrimitiveCollapsible.Trigger>
    );
  },
);

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  function Content({ motion = 'none', keepMounted = false, className, children, ...props }, ref) {
    return (
      <PrimitiveCollapsible.Content
        {...props}
        ref={ref}
        data-slot="content"
        data-motion={motion}
        keepMounted={motion === 'collapse' || keepMounted}
        className={classes(styles.content, className)}
      >
        {motion === 'collapse' ? (
          <div className={styles.contentInner} data-slot="content-inner">
            {children}
          </div>
        ) : (
          children
        )}
      </PrimitiveCollapsible.Content>
    );
  },
);
