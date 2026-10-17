import {
  CircleCheckIcon,
  CircleInfoIcon,
  CircleXIcon,
  CloseIcon,
  TriangleAlertIcon,
} from '@virgo-design/icons';
import { createContext, forwardRef, type ReactNode, useContext } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import styles from './Alert.module.scss';
import type {
  AlertActionProps,
  AlertCloseProps,
  AlertContentProps,
  AlertDescriptionProps,
  AlertIconProps,
  AlertIntent,
  AlertProps,
  AlertTitleProps,
} from './Alert.types';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

function defaultIcon(intent: AlertIntent): ReactNode {
  if (intent === 'success') return <CircleCheckIcon />;
  if (intent === 'info') return <CircleInfoIcon />;
  if (intent === 'warning') return <TriangleAlertIcon />;
  if (intent === 'error') return <CircleXIcon />;

  return null;
}

type AlertContextValue = {
  icon: ReactNode | false | undefined;
  intent: AlertIntent;
};

const AlertContext = createContext<AlertContextValue | null>(null);

function useAlert(part: string) {
  const context = useContext(AlertContext);

  if (!context) throw new Error(`${part} must be used inside Alert.Root.`);

  return context;
}

const Root = forwardRef<HTMLDivElement, AlertProps>(function AlertRoot(
  { intent = 'default', variant = 'soft', icon, role, className, children, ...props },
  ref,
) {
  const semanticRole = intent === 'error' || intent === 'warning' ? 'alert' : 'status';

  return (
    <AlertContext.Provider value={{ icon, intent }}>
      <div
        {...props}
        ref={ref}
        className={classes(styles.root, className)}
        data-intent={intent}
        data-variant={variant}
        role={role ?? semanticRole}
      >
        {children}
      </div>
    </AlertContext.Provider>
  );
});

const Icon = forwardRef<HTMLSpanElement, AlertIconProps>(function AlertIcon(
  { className, ...props },
  ref,
) {
  const context = useAlert('Alert.Icon');
  const icon = context.icon === false ? null : (context.icon ?? defaultIcon(context.intent));

  if (!icon) return null;

  return (
    <span {...props} ref={ref} className={classes(styles.icon, className)} aria-hidden="true">
      {icon}
    </span>
  );
});

const Content = forwardRef<HTMLDivElement, AlertContentProps>(function AlertContent(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.content, className)} />;
});

const Title = forwardRef<HTMLDivElement, AlertTitleProps>(function AlertTitle(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.title, className)} />;
});

const Description = forwardRef<HTMLDivElement, AlertDescriptionProps>(function AlertDescription(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.description, className)} />;
});

const Action = forwardRef<HTMLDivElement, AlertActionProps>(function AlertAction(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.action, className)} />;
});

const Close = forwardRef<HTMLButtonElement, AlertCloseProps>(function AlertClose(
  { className, children, 'aria-label': ariaLabel, onClick, ...props },
  ref,
) {
  const locale = useLocale();

  return (
    <button
      {...props}
      ref={ref}
      className={classes(styles.close, className)}
      type="button"
      aria-label={ariaLabel ?? locale.alert.close}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);
      }}
    >
      {children ?? <CloseIcon aria-hidden="true" />}
    </button>
  );
});

export const Alert = Object.assign(Root, {
  Root,
  Icon,
  Content,
  Title,
  Description,
  Action,
  Close,
});
