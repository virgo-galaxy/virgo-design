import { Tooltip as PrimitiveTooltip } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import { Button } from '../Button';
import styles from './Tooltip.module.scss';
import type { TooltipContentProps, TooltipProps, TooltipTriggerProps } from './Tooltip.types';

const Root = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveTooltip
      {...props}
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(' ')}
    />
  );
});
const Trigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(function TooltipTrigger(
  { render, variant = 'outline', size = 'medium', ...props },
  ref,
) {
  return (
    <PrimitiveTooltip.Trigger
      {...props}
      ref={ref}
      render={
        render ??
        ((buttonProps) => (
          <Button {...buttonProps} variant={variant} size={size}>
            {buttonProps.children}
          </Button>
        ))
      }
    />
  );
});
const Content = forwardRef<HTMLDivElement, TooltipContentProps>(function TooltipContent(
  { arrow = true, tone = 'default', size = 'medium', className, children, ...props },
  ref,
) {
  return (
    <PrimitiveTooltip.Content
      {...props}
      ref={ref}
      data-tone={tone}
      data-size={size}
      className={[styles.content, className].filter(Boolean).join(' ')}
    >
      {arrow && <span className={styles.arrow} data-slot="arrow" aria-hidden="true" />}
      <div className={styles.viewport} data-overlay-viewport="">
        {children}
      </div>
    </PrimitiveTooltip.Content>
  );
});
export const Tooltip = Object.assign(Root, { Trigger, Content });
