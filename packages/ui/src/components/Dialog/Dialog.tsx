import { Dialog as PrimitiveDialog } from '@virgo-design/primitives';
import { forwardRef, type JSX } from 'react';

import { Button } from '../Button';
import type {
  DialogBodyProps,
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from './Dialog.types';

import styles from './Dialog.module.scss';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

const Root = forwardRef<HTMLDivElement, DialogProps>(function DialogRoot(
  { className, ...props },
  ref,
) {
  return <PrimitiveDialog.Root {...props} ref={ref} className={classes(styles.root, className)} />;
});

const Trigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(function DialogTrigger(
  { render, variant = 'outline', size = 'medium', className, children, ...props },
  ref,
) {
  if (render) {
    return (
      <PrimitiveDialog.Trigger {...props} ref={ref} className={className} render={render}>
        {children}
      </PrimitiveDialog.Trigger>
    );
  }

  return (
    <PrimitiveDialog.Trigger
      {...props}
      ref={ref}
      render={(buttonProps) => (
        <Button
          {...buttonProps}
          className={classes(styles.trigger, className)}
          size={size}
          variant={variant}
        >
          {children}
        </Button>
      )}
    />
  );
});

const Portal: (props: DialogPortalProps) => JSX.Element | null = PrimitiveDialog.Portal;

const Overlay = forwardRef<HTMLDivElement, DialogOverlayProps>(function DialogOverlay(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveDialog.Overlay {...props} ref={ref} className={classes(styles.overlay, className)} />
  );
});

const Content = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  { size = 'md', className, ...props },
  ref,
) {
  return (
    <PrimitiveDialog.Content
      {...props}
      ref={ref}
      className={classes(styles.content, className)}
      data-size={size}
    />
  );
});

const Header = forwardRef<HTMLDivElement, DialogHeaderProps>(function DialogHeader(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.header, className)} />;
});

const Body = forwardRef<HTMLDivElement, DialogBodyProps>(function DialogBody(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.body, className)} />;
});

const Footer = forwardRef<HTMLDivElement, DialogFooterProps>(function DialogFooter(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.footer, className)} />;
});

const Title = forwardRef<HTMLHeadingElement, DialogTitleProps>(function DialogTitle(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveDialog.Title {...props} ref={ref} className={classes(styles.title, className)} />
  );
});

const Description = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  function DialogDescription({ className, ...props }, ref) {
    return (
      <PrimitiveDialog.Description
        {...props}
        ref={ref}
        className={classes(styles.description, className)}
      />
    );
  },
);

const Close = forwardRef<HTMLButtonElement, DialogCloseProps>(function DialogClose(
  { render, variant = 'outline', size = 'medium', className, children, ...props },
  ref,
) {
  if (render) {
    return (
      <PrimitiveDialog.Close {...props} ref={ref} className={className} render={render}>
        {children}
      </PrimitiveDialog.Close>
    );
  }

  return (
    <PrimitiveDialog.Close
      {...props}
      ref={ref}
      render={(buttonProps) => (
        <Button
          {...buttonProps}
          className={classes(styles.close, className)}
          size={size}
          variant={variant}
        >
          {children}
        </Button>
      )}
    />
  );
});

export const Dialog = Object.assign(Root, {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Header,
  Body,
  Footer,
  Title,
  Description,
  Close,
});
