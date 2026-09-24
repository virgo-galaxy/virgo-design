import { MenubarMenu, MenubarRoot } from '../../internal/menu/Menubar';
import { menuParts } from '../../internal/menu/parts';
import { MenuTrigger } from '../../internal/menu/Trigger';
export const Menubar = Object.assign(MenubarRoot, {
  Root: MenubarRoot,
  Menu: MenubarMenu,
  Trigger: MenuTrigger,
  ...menuParts,
});
