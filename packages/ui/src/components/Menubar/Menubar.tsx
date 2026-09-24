import { Menubar as PrimitiveMenubar } from '@virgo-design/primitives';
import { forwardRef, useContext } from 'react';

import { menuClasses as cx, MenuSizeContext } from '../../internal/menu/context';
import { menuUIParts } from '../../internal/menu/parts';
import { Button } from '../Button';
import styles from './Menubar.module.scss';
import type { MenubarProps, MenubarTriggerProps } from './Menubar.types';
const Root = forwardRef<HTMLDivElement, MenubarProps>(function MenubarRoot(
  { size = 'medium', className, ...props },
  ref,
) {
  return (
    <MenuSizeContext.Provider value={size}>
      <PrimitiveMenubar.Root {...props} ref={ref} className={cx(styles.root, className)} />
    </MenuSizeContext.Provider>
  );
});
const Trigger = forwardRef<HTMLButtonElement, MenubarTriggerProps>(function MenubarTrigger(
  { render, className, ...props },
  ref,
) {
  const size = useContext(MenuSizeContext);
  return (
    <PrimitiveMenubar.Trigger
      {...props}
      ref={ref}
      className={cx(styles.trigger, className)}
      render={(buttonProps) =>
        render ? (
          render(buttonProps)
        ) : (
          <Button
            {...buttonProps}
            iconOnly={false}
            children={buttonProps.children}
            variant="text"
            size={size}
          />
        )
      }
    />
  );
});
export const Menubar = Object.assign(Root, {
  Root,
  Menu: PrimitiveMenubar.Menu,
  Trigger,
  ...menuUIParts,
});
