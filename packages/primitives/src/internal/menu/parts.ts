import { MenuContent } from './Content';
import {
  MenuCheckboxItem,
  MenuGroup,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
} from './Items';
import { MenuSubmenu } from './Root';
import { MenuTrigger } from './Trigger';
export const menuParts = {
  Content: MenuContent,
  Item: MenuItem,
  Separator: MenuSeparator,
  Group: MenuGroup,
  CheckboxItem: MenuCheckboxItem,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Submenu: MenuSubmenu,
  SubmenuTrigger: MenuTrigger,
  SubmenuContent: MenuContent,
};
