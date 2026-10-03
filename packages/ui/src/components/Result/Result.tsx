import {
  CircleCheckIcon,
  CircleInfoIcon,
  CircleXIcon,
  LockIcon,
  MonitorIcon,
  SearchIcon,
  TriangleAlertIcon,
} from '@virgo-design/icons';
import type { HTMLAttributes } from 'react';
import { createContext, forwardRef, useContext, useId } from 'react';

import styles from './Result.module.scss';
import type { ResultProps, ResultStatus, ResultTitleProps } from './Result.types';
const classes = (...values: (string | undefined)[]) => values.filter(Boolean).join(' ');
const Context = createContext<ResultStatus>('info');
const icons = {
  success: CircleCheckIcon,
  error: CircleXIcon,
  warning: TriangleAlertIcon,
  info: CircleInfoIcon,
  '403': LockIcon,
  '404': SearchIcon,
  '500': MonitorIcon,
};
const Icon = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ResultIcon(
  { children, className, ...props },
  ref,
) {
  const status = useContext(Context),
    Glyph = icons[status];
  return (
    <div
      {...props}
      ref={ref}
      className={classes(styles.icon, className)}
      data-slot="icon"
      aria-hidden="true"
    >
      {children ?? <Glyph size={48} />}
    </div>
  );
});
const Title = forwardRef<HTMLHeadingElement, ResultTitleProps>(function ResultTitle(
  { as: Heading = 'h2', className, ...props },
  ref,
) {
  return (
    <Heading {...props} ref={ref} className={classes(styles.title, className)} data-slot="title" />
  );
});
const Description = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function ResultDescription({ className, ...props }, ref) {
    return (
      <p
        {...props}
        ref={ref}
        className={classes(styles.description, className)}
        data-slot="description"
      />
    );
  },
);
const Actions = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ResultActions(
  { className, ...props },
  ref,
) {
  return (
    <div {...props} ref={ref} className={classes(styles.actions, className)} data-slot="actions" />
  );
});
const Extra = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ResultExtra(
  { className, ...props },
  ref,
) {
  return (
    <div {...props} ref={ref} className={classes(styles.extra, className)} data-slot="extra" />
  );
});
const Root = forwardRef<HTMLDivElement, ResultProps>(function Result(
  {
    status = 'info',
    icon,
    title,
    description,
    headingLevel = 2,
    primaryAction,
    secondaryAction,
    extra,
    children,
    className,
    ...props
  },
  ref,
) {
  const id = useId();
  return (
    <Context.Provider value={status}>
      <div
        {...props}
        ref={ref}
        className={classes(styles.root, className)}
        data-status={status}
        aria-labelledby={props['aria-labelledby'] ?? (title ? id : undefined)}
      >
        {children ?? (
          <>
            <Icon>{icon}</Icon>
            {!icon && ['403', '404', '500'].includes(status) ? (
              <span className={styles.code} aria-hidden="true">
                {status}
              </span>
            ) : null}
            {title ? (
              <Title as={headingLevel === 1 ? 'h1' : headingLevel === 3 ? 'h3' : 'h2'} id={id}>
                {title}
              </Title>
            ) : null}
            {description ? <Description>{description}</Description> : null}
            {primaryAction || secondaryAction ? (
              <Actions>
                {primaryAction}
                {secondaryAction}
              </Actions>
            ) : null}
            {extra ? <Extra>{extra}</Extra> : null}
          </>
        )}
      </div>
    </Context.Provider>
  );
});
export const Result = Object.assign(Root, { Root, Icon, Title, Description, Actions, Extra });
