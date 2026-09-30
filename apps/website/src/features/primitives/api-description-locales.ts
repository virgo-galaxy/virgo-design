import { primitiveApiReference } from '@/generated/api-reference.generated';
import { collectApiDescriptionResources } from '@/i18n/api-description-resources';

import { accordionApiZhCN } from './locales/accordion/api.zh-CN';
import { breadcrumbApiZhCN } from './locales/breadcrumb/api.zh-CN';
import { buttonApiZhCN } from './locales/button/api.zh-CN';
import { checkboxApiZhCN } from './locales/checkbox/api.zh-CN';
import { collapsibleApiZhCN } from './locales/collapsible/api.zh-CN';
import { commandApiZhCN } from './locales/command/api.zh-CN';
import { contextMenuApiZhCN } from './locales/context-menu/api.zh-CN';
import { cursorApiZhCN } from './locales/cursor/api.zh-CN';
import { dialogApiZhCN } from './locales/dialog/api.zh-CN';
import { dockApiZhCN } from './locales/dock/api.zh-CN';
import { dropdownApiZhCN } from './locales/dropdown/api.zh-CN';
import { inputApiZhCN } from './locales/input/api.zh-CN';
import { layoutApiZhCN } from './locales/layout/api.zh-CN';
import { menuApiZhCN } from './locales/menu/api.zh-CN';
import { menubarApiZhCN } from './locales/menubar/api.zh-CN';
import { navigationMenuApiZhCN } from './locales/navigation-menu/api.zh-CN';
import { paginationApiZhCN } from './locales/pagination/api.zh-CN';
import { popoverApiZhCN } from './locales/popover/api.zh-CN';
import { radioApiZhCN } from './locales/radio/api.zh-CN';
import { selectApiZhCN } from './locales/select/api.zh-CN';
import { switchApiZhCN } from './locales/switch/api.zh-CN';
import { tabsApiZhCN } from './locales/tabs/api.zh-CN';
import { textareaApiZhCN } from './locales/textarea/api.zh-CN';
import { toastApiZhCN } from './locales/toast/api.zh-CN';
import { tooltipApiZhCN } from './locales/tooltip/api.zh-CN';

export const primitivesApiEnUS = collectApiDescriptionResources(primitiveApiReference);
export const primitivesApiZhCN = {
  accordion: accordionApiZhCN,
  breadcrumb: breadcrumbApiZhCN,
  button: buttonApiZhCN,
  checkbox: checkboxApiZhCN,
  collapsible: collapsibleApiZhCN,
  command: commandApiZhCN,
  'context-menu': contextMenuApiZhCN,
  cursor: cursorApiZhCN,
  dialog: dialogApiZhCN,
  dock: dockApiZhCN,
  dropdown: dropdownApiZhCN,
  input: inputApiZhCN,
  textarea: textareaApiZhCN,
  layout: layoutApiZhCN,
  menu: menuApiZhCN,
  menubar: menubarApiZhCN,
  'navigation-menu': navigationMenuApiZhCN,
  pagination: paginationApiZhCN,
  popover: popoverApiZhCN,
  radio: radioApiZhCN,
  select: selectApiZhCN,
  switch: switchApiZhCN,
  tabs: tabsApiZhCN,
  toast: toastApiZhCN,
  tooltip: tooltipApiZhCN,
};
