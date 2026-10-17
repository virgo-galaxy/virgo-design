import { Menu as PrimitiveMenu } from '@virgo-design/primitives';
import { forwardRef, useContext } from 'react';

import { menuClasses as cx, MenuSizeContext } from '../../internal/menu/context';
import styles from '../../internal/menu/Menu.module.scss';
import { menuUIParts } from '../../internal/menu/parts';
import { Button } from '../Button';
import type { MenuProps, MenuTriggerProps } from './Menu.types';

const Root = forwardRef<HTMLDivElement, MenuProps>(function MenuRoot(
  { size = 'medium', className, ...props },
  ref,
) {
  return (
    <MenuSizeContext.Provider value={size}>
      <PrimitiveMenu.Root {...props} ref={ref} className={cx(styles.root, className)} />
    </MenuSizeContext.Provider>
  );
});

const Trigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(function MenuTrigger(
  { variant = 'outline', render, ...props },
  ref,
) {
  const size = useContext(MenuSizeContext);
  return (
    <PrimitiveMenu.Trigger
      {...props}
      ref={ref}
      render={(buttonProps) =>
        render ? (
          render(buttonProps)
        ) : (
          <Button
            {...buttonProps}
            iconOnly={false}
            children={buttonProps.children}
            variant={variant}
            size={size}
          />
        )
      }
    />
  );
});

export const Menu = Object.assign(Root, { Root, Trigger, ...menuUIParts });
