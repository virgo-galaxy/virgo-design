import {
  CircleCheckIcon,
  CircleInfoIcon,
  CircleXIcon,
  CloseIcon,
  TriangleAlertIcon,
} from '@virgo-design/icons';
import { Toast as PrimitiveToast } from '@virgo-design/primitives';
import { forwardRef, type ReactNode } from 'react';

import styles from './Toast.module.scss';
import type {
  ToastActionProps,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastIntent,
  ToastProps,
  ToastTitleProps,
  ToastViewportProps,
} from './Toast.types';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

function defaultIcon(intent: ToastIntent): ReactNode {
  if (intent === 'success') return <CircleCheckIcon />;
  if (intent === 'info') return <CircleInfoIcon />;
  if (intent === 'warning') return <TriangleAlertIcon />;
  if (intent === 'error') return <CircleXIcon />;
  return null;
}

const Provider = PrimitiveToast.Provider;

const Root = forwardRef<HTMLDivElement, ToastProps>(function ToastRoot(
  { intent = 'default', appearance = 'panel', icon, className, children, ...props },
  ref,
) {
  const resolvedIcon = icon === false ? null : (icon ?? defaultIcon(intent));
  return (
    <PrimitiveToast.Root
      {...props}
      ref={ref}
      className={classes(styles.root, className)}
      data-intent={intent}
      data-appearance={appearance}
      data-has-icon={Boolean(resolvedIcon)}
    >
      {resolvedIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {resolvedIcon}
        </span>
      ) : null}
      <div className={styles.body}>{children}</div>
    </PrimitiveToast.Root>
  );
});

const Title = forwardRef<HTMLDivElement, ToastTitleProps>(function ToastTitle(
  { className, ...props },
  ref,
) {
  return <PrimitiveToast.Title {...props} ref={ref} className={classes(styles.title, className)} />;
});

const Description = forwardRef<HTMLDivElement, ToastDescriptionProps>(function ToastDescription(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveToast.Description
      {...props}
      ref={ref}
      className={classes(styles.description, className)}
    />
  );
});

const Action = forwardRef<HTMLButtonElement, ToastActionProps>(function ToastAction(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveToast.Action {...props} ref={ref} className={classes(styles.action, className)} />
  );
});

const Close = forwardRef<HTMLButtonElement, ToastCloseProps>(function ToastClose(
  { className, children, 'aria-label': ariaLabel = 'Dismiss notification', ...props },
  ref,
) {
  return (
    <PrimitiveToast.Close
      {...props}
      ref={ref}
      className={classes(styles.close, className)}
      aria-label={ariaLabel}
    >
      {children ?? <CloseIcon aria-hidden="true" />}
    </PrimitiveToast.Close>
  );
});

const Viewport = forwardRef<HTMLDivElement, ToastViewportProps>(function ToastViewport(
  { placement = 'bottom-end', portal = true, className, ...props },
  ref,
) {
  return (
    <PrimitiveToast.Viewport
      {...props}
      portal={portal}
      ref={ref}
      className={classes(styles.viewport, className)}
      data-placement={placement}
    />
  );
});

export const Toast = Object.assign(Root, {
  Provider,
  Root,
  Title,
  Description,
  Action,
  Close,
  Viewport,
});
