import { accordionMetadata } from '../components/Accordion/Accordion.meta';
import { alertMetadata } from '../components/Alert/Alert.meta';
import { avatarMetadata } from '../components/Avatar/Avatar.meta';
import { badgeMetadata } from '../components/Badge/Badge.meta';
import { breadcrumbMetadata } from '../components/Breadcrumb/Breadcrumb.meta';
import { buttonMetadata } from '../components/Button/Button.meta';
import { calendarMetadata } from '../components/Calendar/Calendar.meta';
import { cardMetadata } from '../components/Card/Card.meta';
import { carouselMetadata } from '../components/Carousel/Carousel.meta';
import { checkboxMetadata } from '../components/Checkbox/Checkbox.meta';
import { collapsibleMetadata } from '../components/Collapsible/Collapsible.meta';
import { colorPickerMetadata } from '../components/ColorPicker/ColorPicker.meta';
import { comboboxMetadata } from '../components/Combobox/Combobox.meta';
import { commandMetadata } from '../components/Command/Command.meta';
import { contextMenuMetadata } from '../components/ContextMenu/ContextMenu.meta';
import { cursorMetadata } from '../components/Cursor/Cursor.meta';
import { datePickerMetadata } from '../components/DatePicker/DatePicker.meta';
import { dialogMetadata } from '../components/Dialog/Dialog.meta';
import { dockMetadata } from '../components/Dock/Dock.meta';
import { drawerMetadata } from '../components/Drawer/Drawer.meta';
import { dropdownMetadata } from '../components/Dropdown/Dropdown.meta';
import { emptyMetadata } from '../components/Empty/Empty.meta';
import { fieldMetadata } from '../components/Field/Field.meta';
import { floatingActionMetadata } from '../components/FloatingAction/FloatingAction.meta';
import { formMetadata } from '../components/Form/Form.meta';
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
import { separatorMetadata } from '../components/Separator/Separator.meta';
import { skeletonMetadata } from '../components/Skeleton/Skeleton.meta';
import { sliderMetadata } from '../components/Slider/Slider.meta';
import { spinnerMetadata } from '../components/Spinner/Spinner.meta';
import { stepsMetadata } from '../components/Steps/Steps.meta';
import { surfaceMetadata } from '../components/Surface/Surface.meta';
import { switchMetadata } from '../components/Switch/Switch.meta';
import { tableMetadata } from '../components/Table/Table.meta';
import { tabsMetadata } from '../components/Tabs/Tabs.meta';
import { tagMetadata } from '../components/Tag/Tag.meta';
import { timelineMetadata } from '../components/Timeline/Timeline.meta';
import { timePickerMetadata } from '../components/TimePicker/TimePicker.meta';
import { toastMetadata } from '../components/Toast/Toast.meta';
import { tooltipMetadata } from '../components/Tooltip/Tooltip.meta';
import { treeMetadata } from '../components/Tree/Tree.meta';

export {
  accordionMetadata,
  alertMetadata,
  avatarMetadata,
  badgeMetadata,
  breadcrumbMetadata,
  buttonMetadata,
  calendarMetadata,
  cardMetadata,
  carouselMetadata,
  checkboxMetadata,
  collapsibleMetadata,
  colorPickerMetadata,
  comboboxMetadata,
  commandMetadata,
  contextMenuMetadata,
  cursorMetadata,
  datePickerMetadata,
  dialogMetadata,
  dockMetadata,
  drawerMetadata,
  dropdownMetadata,
  emptyMetadata,
  fieldMetadata,
  floatingActionMetadata,
  formMetadata,
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
  separatorMetadata,
  skeletonMetadata,
  sliderMetadata,
  spinnerMetadata,
  stepsMetadata,
  surfaceMetadata,
  switchMetadata,
  tableMetadata,
  tabsMetadata,
  tagMetadata,
  textareaMetadata,
  timelineMetadata,
  timePickerMetadata,
  toastMetadata,
  tooltipMetadata,
  treeMetadata,
};

export const componentMetadataRegistry = {
  slider: sliderMetadata,
  colorPicker: colorPickerMetadata,
  timePicker: timePickerMetadata,
  datePicker: datePickerMetadata,
  calendar: calendarMetadata,
  timeline: timelineMetadata,

  combobox: comboboxMetadata,
  tree: treeMetadata,
  table: tableMetadata,
  field: fieldMetadata,
  form: formMetadata,
  menubar: menubarMetadata,
  contextMenu: contextMenuMetadata,
  menu: menuMetadata,
  steps: stepsMetadata,
  carousel: carouselMetadata,
  collapsible: collapsibleMetadata,
  accordion: accordionMetadata,
  alert: alertMetadata,
  avatar: avatarMetadata,
  badge: badgeMetadata,
  button: buttonMetadata,
  card: cardMetadata,
  breadcrumb: breadcrumbMetadata,
  checkbox: checkboxMetadata,
  command: commandMetadata,
  cursor: cursorMetadata,
  dialog: dialogMetadata,
  drawer: drawerMetadata,
  dropdown: dropdownMetadata,
  dock: dockMetadata,
  empty: emptyMetadata,
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
  separator: separatorMetadata,
  skeleton: skeletonMetadata,
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
