import { SearchIcon } from '@virgo-design/icons';
import { Command as PrimitiveCommand } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import { Dialog } from '../Dialog';
import styles from './Command.module.scss';
import type {
  CommandDialogProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandInputProps,
  CommandItemProps,
  CommandListProps,
  CommandProps,
  CommandSeparatorProps,
} from './Command.types';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

const Root = forwardRef<HTMLDivElement, CommandProps>(function CommandRoot(
  { className, ...props },
  ref,
) {
  return <PrimitiveCommand.Root {...props} ref={ref} className={classes(styles.root, className)} />;
});

const Input = forwardRef<HTMLInputElement, CommandInputProps>(function CommandInput(
  { className, ...props },
  ref,
) {
  return (
    <div className={styles.inputFrame}>
      <SearchIcon className={styles.searchIcon} aria-hidden="true" />
      <PrimitiveCommand.Input {...props} ref={ref} className={classes(styles.input, className)} />
    </div>
  );
});

const List = forwardRef<HTMLDivElement, CommandListProps>(function CommandList(
  { className, ...props },
  ref,
) {
  return <PrimitiveCommand.List {...props} ref={ref} className={classes(styles.list, className)} />;
});

const Empty = forwardRef<HTMLDivElement, CommandEmptyProps>(function CommandEmpty(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveCommand.Empty {...props} ref={ref} className={classes(styles.empty, className)} />
  );
});

const Group = forwardRef<HTMLDivElement, CommandGroupProps>(function CommandGroup(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveCommand.Group {...props} ref={ref} className={classes(styles.group, className)} />
  );
});

const Item = forwardRef<HTMLDivElement, CommandItemProps>(function CommandItem(
  { className, icon, shortcut, children, ...props },
  ref,
) {
  return (
    <PrimitiveCommand.Item {...props} ref={ref} className={classes(styles.item, className)}>
      {icon ? (
        <span className={styles.itemIcon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={styles.itemLabel}>{children}</span>
      {shortcut ? (
        <span className={styles.shortcut} aria-hidden="true">
          {shortcut}
        </span>
      ) : null}
    </PrimitiveCommand.Item>
  );
});

const Separator = forwardRef<HTMLDivElement, CommandSeparatorProps>(function CommandSeparator(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveCommand.Separator
      {...props}
      ref={ref}
      className={classes(styles.separator, className)}
    />
  );
});

function CommandDialog({
  open,
  defaultOpen,
  onOpenChange,
  modal,
  search,
  defaultSearch,
  onSearchChange,
  value,
  defaultValue,
  onValueChange,
  shouldFilter,
  filter,
  className,
  contentClassName,
  overlayClassName,
  'aria-label': ariaLabel = 'Command palette',
  children,
}: CommandDialogProps) {
  return (
    <Dialog.Root
      {...(open === undefined ? {} : { open })}
      {...(defaultOpen === undefined ? {} : { defaultOpen })}
      {...(onOpenChange ? { onOpenChange } : {})}
      {...(modal === undefined ? {} : { modal })}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={overlayClassName} />
        <Dialog.Content
          size="md"
          className={classes(styles.dialogContent, contentClassName)}
          aria-label={ariaLabel}
        >
          <Root
            className={className}
            {...(search === undefined ? {} : { search })}
            {...(defaultSearch === undefined ? {} : { defaultSearch })}
            {...(onSearchChange ? { onSearchChange } : {})}
            {...(value === undefined ? {} : { value })}
            {...(defaultValue === undefined ? {} : { defaultValue })}
            {...(onValueChange ? { onValueChange } : {})}
            {...(shouldFilter === undefined ? {} : { shouldFilter })}
            {...(filter ? { filter } : {})}
          >
            {children}
          </Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export const Command = Object.assign(Root, {
  Root,
  Dialog: CommandDialog,
  Input,
  List,
  Empty,
  Group,
  Item,
  Separator,
});
