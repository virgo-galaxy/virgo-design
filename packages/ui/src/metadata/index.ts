import { accordionMetadata } from '../components/Accordion/Accordion.meta';
import { alertMetadata } from '../components/Alert/Alert.meta';
import { avatarMetadata } from '../components/Avatar/Avatar.meta';
import { badgeMetadata } from '../components/Badge/Badge.meta';
import { breadcrumbMetadata } from '../components/Breadcrumb/Breadcrumb.meta';
import { buttonMetadata } from '../components/Button/Button.meta';
import { checkboxMetadata } from '../components/Checkbox/Checkbox.meta';
import { commandMetadata } from '../components/Command/Command.meta';
import { contextMenuMetadata } from '../components/ContextMenu/ContextMenu.meta';
import { dialogMetadata } from '../components/Dialog/Dialog.meta';
import { drawerMetadata } from '../components/Drawer/Drawer.meta';
import { dropdownMetadata } from '../components/Dropdown/Dropdown.meta';
import { floatingActionMetadata } from '../components/FloatingAction/FloatingAction.meta';
import { inputMetadata } from '../components/Input/Input.meta';
import { textareaMetadata } from '../components/Input/Textarea.meta';
import { layoutMetadata } from '../components/Layout/Layout.meta';
import { menuMetadata } from '../components/Menu/Menu.meta';
import { menubarMetadata } from '../components/Menubar/Menubar.meta';
import { navigationMenuMetadata } from '../components/NavigationMenu/NavigationMenu.meta';
import { paginationMetadata } from '../components/Pagination/Pagination.meta';
import { popoverMetadata } from '../components/Popover/Popover.meta';
import { progressMetadata } from '../components/Progress/Progress.meta';
import { radioMetadata } from '../components/Radio/Radio.meta';
import { segmentedControlMetadata } from '../components/SegmentedControl/SegmentedControl.meta';
import { selectMetadata } from '../components/Select/Select.meta';
import { spinnerMetadata } from '../components/Spinner/Spinner.meta';
import { surfaceMetadata } from '../components/Surface/Surface.meta';
import { switchMetadata } from '../components/Switch/Switch.meta';
import { tabsMetadata } from '../components/Tabs/Tabs.meta';
import { tagMetadata } from '../components/Tag/Tag.meta';
import { toastMetadata } from '../components/Toast/Toast.meta';
import { tooltipMetadata } from '../components/Tooltip/Tooltip.meta';

export {
  accordionMetadata,
  alertMetadata,
  avatarMetadata,
  badgeMetadata,
  breadcrumbMetadata,
  buttonMetadata,
  checkboxMetadata,
  commandMetadata,
  contextMenuMetadata,
  dialogMetadata,
  drawerMetadata,
  dropdownMetadata,
  floatingActionMetadata,
  inputMetadata,
  layoutMetadata,
  menubarMetadata,
  menuMetadata,
  navigationMenuMetadata,
  paginationMetadata,
  popoverMetadata,
  progressMetadata,
  radioMetadata,
  segmentedControlMetadata,
  selectMetadata,
  spinnerMetadata,
  surfaceMetadata,
  switchMetadata,
  tabsMetadata,
  tagMetadata,
  textareaMetadata,
  toastMetadata,
  tooltipMetadata,
};

export const componentMetadataRegistry = {
  menubar: menubarMetadata,
  contextMenu: contextMenuMetadata,
  menu: menuMetadata,
  accordion: accordionMetadata,
  alert: alertMetadata,
  avatar: avatarMetadata,
  badge: badgeMetadata,
  button: buttonMetadata,
  breadcrumb: breadcrumbMetadata,
  checkbox: checkboxMetadata,
  command: commandMetadata,
  dialog: dialogMetadata,
  drawer: drawerMetadata,
  dropdown: dropdownMetadata,
  input: inputMetadata,
  layout: layoutMetadata,
  floatingAction: floatingActionMetadata,
  navigationMenu: navigationMenuMetadata,
  pagination: paginationMetadata,
  popover: popoverMetadata,
  progress: progressMetadata,
  radio: radioMetadata,
  segmentedControl: segmentedControlMetadata,
  select: selectMetadata,
  spinner: spinnerMetadata,
  surface: surfaceMetadata,
  switch: switchMetadata,
  tabs: tabsMetadata,
  tag: tagMetadata,
  tooltip: tooltipMetadata,
  toast: toastMetadata,
  textarea: textareaMetadata,
} as const;

export type {
  ComponentMetadata,
  ComponentMetadataExample,
  ComponentMetadataOption,
} from './ComponentMetadata';
