import { CloseIcon, PlusIcon } from '@virgo-design/icons';
import { Popover as PrimitivePopover } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import { Button } from '../Button';
import styles from './FloatingAction.module.scss';
import type {
  FloatingActionContentProps,
  FloatingActionGroupProps,
  FloatingActionProps,
  FloatingActionTriggerProps,
} from './FloatingAction.types';

const join = (...values: Array<string | undefined>) => values.filter(Boolean).join(' ');

const Action = forwardRef<HTMLButtonElement, FloatingActionProps>(function FloatingAction(
  { size = 'large', variant = 'secondary', className, ...props },
  ref,
) {
  return (
    <Button
      {...props}
      ref={ref}
      iconOnly
      shape="circle"
      size={size}
      variant={variant}
      className={join(styles.action, className)}
    />
  );
});
Action.displayName = 'FloatingAction';

const Group = forwardRef<HTMLDivElement, FloatingActionGroupProps>(function FloatingActionGroup(
  { className, ...props },
  ref,
) {
  return <PrimitivePopover {...props} ref={ref} className={join(styles.group, className)} />;
});
Group.displayName = 'FloatingAction.Group';

const Trigger = forwardRef<HTMLButtonElement, FloatingActionTriggerProps>(
  function FloatingActionTrigger(
    {
      'aria-label': label,
      variant = 'primary',
      size = 'large',
      className,
      children,
      render,
      ...props
    },
    ref,
  ) {
    return (
      <PrimitivePopover.Trigger
        {...props}
        ref={ref}
        aria-label={label}
        className={className}
        render={(buttonProps) => {
          const content = children ?? (buttonProps['aria-expanded'] ? <CloseIcon /> : <PlusIcon />);
          return render ? (
            render({ ...buttonProps, children: content })
          ) : (
            <Action {...buttonProps} aria-label={label} variant={variant} size={size}>
              {content}
            </Action>
          );
        }}
      />
    );
  },
);
Trigger.displayName = 'FloatingAction.Trigger';

const Content = forwardRef<HTMLDivElement, FloatingActionContentProps>(
  function FloatingActionContent({ placement = 'top', className, children, ...props }, ref) {
    return (
      <PrimitivePopover.Content
        {...props}
        ref={ref}
        placement={placement}
        className={join(styles.content, className)}
      >
        {children}
      </PrimitivePopover.Content>
    );
  },
);
Content.displayName = 'FloatingAction.Content';

export const FloatingAction = Object.assign(Action, { Group, Trigger, Content });
