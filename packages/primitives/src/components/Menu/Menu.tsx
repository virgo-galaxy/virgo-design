import { menuParts } from '../../internal/menu/parts';
import { MenuRoot } from '../../internal/menu/Root';
import { MenuTrigger } from '../../internal/menu/Trigger';
export const Menu = Object.assign(MenuRoot, { Root: MenuRoot, Trigger: MenuTrigger, ...menuParts });
