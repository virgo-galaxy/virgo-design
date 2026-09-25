import { forwardRef } from 'react';

import styles from './Empty.module.scss';
import type {
  EmptyActionProps,
  EmptyDescriptionProps,
  EmptyIconProps,
  EmptyProps,
  EmptyTitleProps,
} from './Empty.types';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

const Root = forwardRef<HTMLElement, EmptyProps>(function EmptyRoot(
  { size = 'md', className, ...props },
  ref,
) {
  return (
    <section {...props} ref={ref} className={classes(styles.root, className)} data-size={size} />
  );
});

const Icon = forwardRef<HTMLDivElement, EmptyIconProps>(function EmptyIcon(
  { className, 'aria-hidden': ariaHidden = 'true', ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={classes(styles.icon, className)}
      aria-hidden={ariaHidden}
    />
  );
});

const Title = forwardRef<HTMLHeadingElement, EmptyTitleProps>(function EmptyTitle(
  { className, ...props },
  ref,
) {
  return <h3 {...props} ref={ref} className={classes(styles.title, className)} />;
});

const Description = forwardRef<HTMLParagraphElement, EmptyDescriptionProps>(
  function EmptyDescription({ className, ...props }, ref) {
    return <p {...props} ref={ref} className={classes(styles.description, className)} />;
  },
);

const Action = forwardRef<HTMLDivElement, EmptyActionProps>(function EmptyAction(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.action, className)} />;
});

Root.displayName = 'Empty';
Icon.displayName = 'Empty.Icon';
Title.displayName = 'Empty.Title';
Description.displayName = 'Empty.Description';
Action.displayName = 'Empty.Action';

export const Empty = Object.assign(Root, {
  Root,
  Icon,
  Title,
  Description,
  Action,
});
