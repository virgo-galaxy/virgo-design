import { CloseIcon } from '@virgo-design/icons';
import { Dialog as PrimitiveDialog } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import styles from './Drawer.module.scss';
import type {
  DrawerBodyProps,
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerOverlayProps,
  DrawerRootProps,
  DrawerTitleProps,
} from './Drawer.types';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

// Keep Drawer composition independent: attaching parts to Dialog.Root mutates Dialog itself.
const Root = forwardRef<HTMLDivElement, DrawerRootProps>(function DrawerRoot(props, ref) {
  return <Dialog.Root {...props} ref={ref} />;
});
Root.displayName = 'Drawer.Root';
const Trigger = Dialog.Trigger;
const Portal = Dialog.Portal;

const Overlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(function DrawerOverlay(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveDialog.Overlay {...props} ref={ref} className={classes(styles.overlay, className)} />
  );
});

const Content = forwardRef<HTMLDivElement, DrawerContentProps>(function DrawerContent(
  { placement = 'right', size = 'md', className, ...props },
  ref,
) {
  return (
    <PrimitiveDialog.Content
      {...props}
      ref={ref}
      className={classes(styles.content, className)}
      data-placement={placement}
      data-size={size}
    />
  );
});

const Header = forwardRef<HTMLDivElement, DrawerHeaderProps>(function DrawerHeader(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.header, className)} />;
});

const Body = forwardRef<HTMLDivElement, DrawerBodyProps>(function DrawerBody(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.body, className)} />;
});

const Footer = forwardRef<HTMLDivElement, DrawerFooterProps>(function DrawerFooter(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.footer, className)} />;
});

const Title = forwardRef<HTMLHeadingElement, DrawerTitleProps>(function DrawerTitle(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveDialog.Title {...props} ref={ref} className={classes(styles.title, className)} />
  );
});

const Description = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  function DrawerDescription({ className, ...props }, ref) {
    return (
      <PrimitiveDialog.Description
        {...props}
        ref={ref}
        className={classes(styles.description, className)}
      />
    );
  },
);

const Close = forwardRef<HTMLButtonElement, DrawerCloseProps>(function DrawerClose(
  { render, variant, size, className, children, 'aria-label': ariaLabel, ...props },
  ref,
) {
  const locale = useLocale();

  if (render) {
    return (
      <PrimitiveDialog.Close
        {...props}
        ref={ref}
        className={className}
        aria-label={ariaLabel}
        render={render}
      >
        {children}
      </PrimitiveDialog.Close>
    );
  }

  if (children !== undefined) {
    return (
      <PrimitiveDialog.Close
        {...props}
        ref={ref}
        aria-label={ariaLabel}
        render={(buttonProps) => (
          <Button
            {...buttonProps}
            className={classes(styles.closeAction, className)}
            size={size ?? 'medium'}
            variant={variant ?? 'outline'}
          >
            {children}
          </Button>
        )}
      />
    );
  }

  return (
    <PrimitiveDialog.Close
      {...props}
      ref={ref}
      render={(buttonProps) => (
        <Button
          {...buttonProps}
          aria-label={ariaLabel ?? locale.drawer.close}
          className={classes(styles.close, className)}
          iconOnly
          size={size ?? 'small'}
          variant={variant ?? 'text'}
        >
          <CloseIcon />
        </Button>
      )}
    />
  );
});

export const Drawer = Object.assign(Root, {
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
