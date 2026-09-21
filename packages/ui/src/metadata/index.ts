import { breadcrumbMetadata } from '../breadcrumb/Breadcrumb.meta';
import { buttonMetadata } from '../button/Button.meta';
import { checkboxMetadata } from '../checkbox/Checkbox.meta';
import { dropdownMetadata } from '../dropdown/Dropdown.meta';
import { inputMetadata } from '../input/Input.meta';
import { textareaMetadata } from '../input/Textarea.meta';
import { layoutMetadata } from '../layout/Layout.meta';
import { paginationMetadata } from '../pagination/Pagination.meta';
import { radioMetadata } from '../radio/Radio.meta';
import { segmentedControlMetadata } from '../segmented-control/SegmentedControl.meta';
import { selectMetadata } from '../select/Select.meta';
import { surfaceMetadata } from '../surface/Surface.meta';
import { switchMetadata } from '../switch/Switch.meta';
import { tabsMetadata } from '../tabs/Tabs.meta';

export {
  breadcrumbMetadata,
  buttonMetadata,
  checkboxMetadata,
  dropdownMetadata,
  inputMetadata,
  layoutMetadata,
  paginationMetadata,
  radioMetadata,
  segmentedControlMetadata,
  selectMetadata,
  surfaceMetadata,
  switchMetadata,
  tabsMetadata,
  textareaMetadata,
};

export const componentMetadataRegistry = {
  button: buttonMetadata,
  breadcrumb: breadcrumbMetadata,
  checkbox: checkboxMetadata,
  dropdown: dropdownMetadata,
  input: inputMetadata,
  layout: layoutMetadata,
  pagination: paginationMetadata,
  radio: radioMetadata,
  segmentedControl: segmentedControlMetadata,
  select: selectMetadata,
  surface: surfaceMetadata,
  switch: switchMetadata,
  tabs: tabsMetadata,
  textarea: textareaMetadata,
} as const;

export type {
  ComponentMetadata,
  ComponentMetadataExample,
  ComponentMetadataOption,
} from './ComponentMetadata';
