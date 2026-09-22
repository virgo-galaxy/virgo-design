import { Popover as PrimitivePopover } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import { Button } from '../Button';
import styles from './Popover.module.scss';
import type {
  PopoverCloseProps,
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from './Popover.types';

const Root = forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  { className, ...props },
  ref,
) {
  return (
    <PrimitivePopover
      {...props}
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(' ')}
    />
  );
});
const Trigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(function PopoverTrigger(
  { render, variant = 'outline', size = 'medium', className, children, ...props },
  ref,
) {
  if (render)
    return (
      <PrimitivePopover.Trigger {...props} ref={ref} className={className} render={render}>
        {children}
      </PrimitivePopover.Trigger>
    );
  return (
    <PrimitivePopover.Trigger
      {...props}
      ref={ref}
      render={(buttonProps) => (
        <Button
          {...buttonProps}
          size={size}
          variant={variant}
          className={[styles.trigger, className].filter(Boolean).join(' ')}
        >
          {children}
        </Button>
      )}
    />
  );
});
const Content = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { arrow = false, className, children, ...props },
  ref,
) {
  return (
    <PrimitivePopover.Content
      {...props}
      ref={ref}
      className={[styles.content, className].filter(Boolean).join(' ')}
    >
      {arrow ? <span className={styles.arrow} data-slot="arrow" aria-hidden="true" /> : null}
      <div className={styles.viewport} data-overlay-viewport="">
        {children}
      </div>
    </PrimitivePopover.Content>
  );
});
const Close = forwardRef<HTMLButtonElement, PopoverCloseProps>(function PopoverClose(
  { className, children = 'Close', ...props },
  ref,
) {
  return (
    <PrimitivePopover.Close
      {...props}
      ref={ref}
      className={[styles.close, className].filter(Boolean).join(' ')}
    >
      {children}
    </PrimitivePopover.Close>
  );
});
export const Popover = Object.assign(Root, { Trigger, Content, Close });
