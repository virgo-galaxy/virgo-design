import { CheckIcon, ChevronDownIcon, EllipsisIcon } from '@virgo-design/icons';
import { Dropdown as PrimitiveDropdown } from '@virgo-design/primitives';
import { createContext, forwardRef, useContext } from 'react';

import { PopupMaterial } from '../../internal/overlay/PopupMaterial';
import { Button, type ButtonSize } from '../Button';
import styles from './Dropdown.module.scss';
import type {
  DropdownButtonProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownProps,
  DropdownTriggerProps,
} from './Dropdown.types';

const UIContext = createContext<{ size: ButtonSize; disabled: boolean }>({
  size: 'medium',
  disabled: false,
});
const classes = (...values: (string | undefined | false)[]) => values.filter(Boolean).join(' ');

const Root = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  { size = 'medium', disabled = false, className, ...props },
  ref,
) {
  return (
    <UIContext.Provider value={{ size, disabled }}>
      <PrimitiveDropdown
        {...props}
        ref={ref}
        disabled={disabled}
        className={classes(styles.root, className)}
      />
    </UIContext.Provider>
  );
});

const Trigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  function DropdownTrigger(triggerProps, ref) {
    const {
      variant = 'outline',
      danger = false,
      iconOnly,
      indicator = <ChevronDownIcon />,
      className,
      children,
      render,
      ...props
    } = triggerProps;
    const layoutProps = triggerProps.iconOnly
      ? { iconOnly: true as const, 'aria-label': triggerProps['aria-label'] }
      : { iconOnly: false as const, trailingIcon: indicator };
    const { size } = useContext(UIContext);
    if (render) {
      return (
        <PrimitiveDropdown.Trigger {...props} ref={ref} render={render}>
          {children}
        </PrimitiveDropdown.Trigger>
      );
    }
    return (
      <PrimitiveDropdown.Trigger
        {...props}
        ref={ref}
        render={(buttonProps) => (
          <Button
            {...buttonProps}
            variant={variant}
            {...layoutProps}
            size={size}
            className={classes(
              styles.trigger,
              iconOnly && styles.iconOnly,
              danger && styles.danger,
              className,
            )}
          >
            {children}
          </Button>
        )}
      />
    );
  },
);

const Content = forwardRef<HTMLDivElement, DropdownContentProps>(function DropdownContent(
  { arrow = false, className, children, ...props },
  ref,
) {
  const { size } = useContext(UIContext);
  return (
    <PrimitiveDropdown.Content
      {...props}
      ref={ref}
      data-size={size}
      className={classes(styles.content, className)}
    >
      {arrow ? <span className={styles.arrow} data-slot="arrow" aria-hidden="true" /> : null}
      {arrow ? <PopupMaterial /> : null}
      <div className={styles.viewport} data-dropdown-viewport="" data-overlay-viewport="">
        {children}
      </div>
    </PrimitiveDropdown.Content>
  );
});

const Item = forwardRef<HTMLButtonElement, DropdownItemProps>(function DropdownItem(
  { icon, danger = false, className, children, checked, ...props },
  ref,
) {
  return (
    <PrimitiveDropdown.Item
      {...props}
      {...(checked === undefined ? {} : { checked })}
      ref={ref}
      className={classes(styles.item, danger && styles.danger, className)}
    >
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
      {checked !== undefined ? (
        <span className={styles.check} aria-hidden="true">
          <CheckIcon />
        </span>
      ) : null}
    </PrimitiveDropdown.Item>
  );
});

const Separator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DropdownSeparator({ className, ...props }, ref) {
    return (
      <PrimitiveDropdown.Separator
        {...props}
        ref={ref}
        className={classes(styles.separator, className)}
      />
    );
  },
);

const SplitButton = forwardRef<HTMLButtonElement, DropdownButtonProps>(function DropdownButton(
  {
    menuLabel,
    menuIcon = <EllipsisIcon />,
    variant = 'outline',
    danger = false,
    disabled,
    className,
    children,
    ...props
  },
  ref,
) {
  const context = useContext(UIContext);
  return (
    <div className={styles.split}>
      <Button
        {...props}
        ref={ref}
        type="button"
        size={context.size}
        variant={variant}
        disabled={context.disabled || disabled}
        className={classes(styles.mainAction, danger && styles.danger, className)}
      >
        {children}
      </Button>
      <Trigger
        disabled={context.disabled || disabled}
        variant={variant}
        danger={danger}
        indicator={false}
        aria-label={menuLabel}
        className={styles.splitTrigger}
      >
        <span className={styles.icon} aria-hidden="true">
          {menuIcon}
        </span>
      </Trigger>
    </div>
  );
});

export const Dropdown = Object.assign(Root, {
  Trigger,
  Content,
  Item,
  Separator,
  Button: SplitButton,
});
