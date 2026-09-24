import { accordionMetadata } from '../components/Accordion/Accordion.meta';
import { breadcrumbMetadata } from '../components/Breadcrumb/Breadcrumb.meta';
import { buttonMetadata } from '../components/Button/Button.meta';
import { checkboxMetadata } from '../components/Checkbox/Checkbox.meta';
import { dialogMetadata } from '../components/Dialog/Dialog.meta';
import { dropdownMetadata } from '../components/Dropdown/Dropdown.meta';
import { inputMetadata } from '../components/Input/Input.meta';
import { textareaMetadata } from '../components/Input/Textarea.meta';
import { layoutMetadata } from '../components/Layout/Layout.meta';
import { paginationMetadata } from '../components/Pagination/Pagination.meta';
import { popoverMetadata } from '../components/Popover/Popover.meta';
import { radioMetadata } from '../components/Radio/Radio.meta';
import { segmentedControlMetadata } from '../components/SegmentedControl/SegmentedControl.meta';
import { selectMetadata } from '../components/Select/Select.meta';
import { surfaceMetadata } from '../components/Surface/Surface.meta';
import { switchMetadata } from '../components/Switch/Switch.meta';
import { tabsMetadata } from '../components/Tabs/Tabs.meta';
import { tooltipMetadata } from '../components/Tooltip/Tooltip.meta';

export {
  accordionMetadata,
  breadcrumbMetadata,
  buttonMetadata,
  checkboxMetadata,
  dialogMetadata,
  dropdownMetadata,
  inputMetadata,
  layoutMetadata,
  paginationMetadata,
  popoverMetadata,
  radioMetadata,
  segmentedControlMetadata,
  selectMetadata,
  surfaceMetadata,
  switchMetadata,
  tabsMetadata,
  textareaMetadata,
  tooltipMetadata,
};

export const componentMetadataRegistry = {
  accordion: accordionMetadata,
  button: buttonMetadata,
  breadcrumb: breadcrumbMetadata,
  checkbox: checkboxMetadata,
  dialog: dialogMetadata,
  dropdown: dropdownMetadata,
  input: inputMetadata,
  layout: layoutMetadata,
  pagination: paginationMetadata,
  popover: popoverMetadata,
  radio: radioMetadata,
  segmentedControl: segmentedControlMetadata,
  select: selectMetadata,
  surface: surfaceMetadata,
  switch: switchMetadata,
  tabs: tabsMetadata,
  tooltip: tooltipMetadata,
  textarea: textareaMetadata,
} as const;

export type {
  ComponentMetadata,
  ComponentMetadataExample,
  ComponentMetadataOption,
} from './ComponentMetadata';
