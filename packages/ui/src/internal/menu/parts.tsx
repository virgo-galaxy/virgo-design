import { CheckIcon, ChevronRightIcon, MinusIcon } from '@virgo-design/icons';
import type { MenuContentProps, MenuGroupProps } from '@virgo-design/primitives';
import { Menu as PrimitiveMenu } from '@virgo-design/primitives';
import type { ReactNode } from 'react';
import { forwardRef, useContext, useId } from 'react';

import type {
  MenuCheckboxItemProps,
  MenuGroupProps as MenuUIGroupProps,
  MenuItemProps,
  MenuRadioItemProps,
  MenuSubmenuTriggerProps,
} from '../../components/Menu/Menu.types';
import { menuClasses as cx, MenuSizeContext } from './context';
import styles from './Menu.module.scss';

const Content = forwardRef<HTMLDivElement, MenuContentProps>(function MenuContent(
  { className, ...props },
  ref,
) {
  const size = useContext(MenuSizeContext);
  return (
    <PrimitiveMenu.Content
      {...props}
      ref={ref}
      className={cx(styles.content, className)}
      data-size={size}
    />
  );
});
function ItemLabel({
  icon,
  children,
  shortcut,
}: {
  icon?: ReactNode;
  children?: ReactNode;
  shortcut?: ReactNode;
}) {
  return (
    <>
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={styles.label} data-menu-label="">
        {children}
      </span>
      {shortcut ? (
        <kbd className={styles.shortcut} data-slot="shortcut" aria-hidden="true">
          {shortcut}
        </kbd>
      ) : null}
    </>
  );
}
const Item = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  { icon, shortcut, danger, className, children, ...props },
  ref,
) {
  return (
    <PrimitiveMenu.Item
      {...props}
      ref={ref}
      className={cx(styles.item, danger && styles.danger, className)}
    >
      <ItemLabel icon={icon} shortcut={shortcut}>
        {children}
      </ItemLabel>
    </PrimitiveMenu.Item>
  );
});
const CheckboxItem = forwardRef<HTMLButtonElement, MenuCheckboxItemProps>(function MenuCheckboxItem(
  { icon, shortcut, danger, className, children, ...props },
  ref,
) {
  return (
    <PrimitiveMenu.CheckboxItem
      {...props}
      ref={ref}
      className={cx(styles.item, danger && styles.danger, className)}
    >
      <span className={styles.indicator} aria-hidden="true">
        {props.checked === 'mixed' ? <MinusIcon /> : <CheckIcon />}
      </span>
      <ItemLabel icon={icon} shortcut={shortcut}>
        {children}
      </ItemLabel>
    </PrimitiveMenu.CheckboxItem>
  );
});
const RadioItem = forwardRef<HTMLButtonElement, MenuRadioItemProps>(function MenuRadioItem(
  { icon, shortcut, danger, className, children, ...props },
  ref,
) {
  return (
    <PrimitiveMenu.RadioItem
      {...props}
      ref={ref}
      className={cx(styles.item, danger && styles.danger, className)}
    >
      <span className={styles.indicator} aria-hidden="true">
        <CheckIcon />
      </span>
      <ItemLabel icon={icon} shortcut={shortcut}>
        {children}
      </ItemLabel>
    </PrimitiveMenu.RadioItem>
  );
});
const SubmenuTrigger = forwardRef<HTMLButtonElement, MenuSubmenuTriggerProps>(
  function MenuSubmenuTrigger({ icon, className, children, render, ...props }, ref) {
    const content = (
      <>
        <ItemLabel icon={icon}>{children}</ItemLabel>
        <span className={cx(styles.icon, styles.chevron)} aria-hidden="true">
          <ChevronRightIcon />
        </span>
      </>
    );
    return (
      <PrimitiveMenu.SubmenuTrigger
        {...props}
        ref={ref}
        className={cx(styles.item, className)}
        {...(render ? { render } : {})}
      >
        {content}
      </PrimitiveMenu.SubmenuTrigger>
    );
  },
);
const Separator = forwardRef<HTMLDivElement, MenuGroupProps>(function MenuSeparator(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveMenu.Separator {...props} ref={ref} className={cx(styles.separator, className)} />
  );
});

const Group = forwardRef<HTMLDivElement, MenuUIGroupProps>(function MenuGroup(
  { label, children, ...props },
  ref,
) {
  const id = useId();
  return (
    <PrimitiveMenu.Group
      {...props}
      ref={ref}
      aria-labelledby={props['aria-labelledby'] ?? (label ? id : undefined)}
    >
      {label ? (
        <div className={styles.groupLabel} id={id}>
          {label}
        </div>
      ) : null}
      {children}
    </PrimitiveMenu.Group>
  );
});
export const menuUIParts = {
  Content,
  Item,
  CheckboxItem,
  RadioItem,
  Group,
  Separator,
  RadioGroup: PrimitiveMenu.RadioGroup,
  Submenu: PrimitiveMenu.Submenu,
  SubmenuTrigger,
  SubmenuContent: Content,
};
