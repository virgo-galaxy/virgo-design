import {
  Breadcrumb,
  Button,
  Checkbox,
  Dropdown,
  type DropdownProps,
  Input,
  Layout,
  type LayoutContentProps,
  type LayoutFooterProps,
  type LayoutHeaderProps,
  type LayoutProps,
  type LayoutSidebarProps,
  Pagination,
  type PaginationProps,
  Popover,
  type PopoverCloseProps,
  type PopoverContentProps,
  type PopoverProps,
  type PopoverTriggerProps,
  Radio,
  SegmentedControl,
  Select,
  type SelectContentProps,
  type SelectOptionProps,
  type SelectProps,
  type SelectTriggerProps,
  Surface,
  type SurfaceProps,
  Switch,
  Tabs,
  Textarea,
} from '@virgo-design/ui';
import { type ComponentMetadata, componentMetadataRegistry } from '@virgo-design/ui/metadata';

const buttonMetadata: ComponentMetadata = componentMetadataRegistry.button;
const breadcrumbMetadata: ComponentMetadata = componentMetadataRegistry.breadcrumb;
const checkboxMetadata: ComponentMetadata = componentMetadataRegistry.checkbox;
const inputMetadata: ComponentMetadata = componentMetadataRegistry.input;
const layoutMetadata: ComponentMetadata = componentMetadataRegistry.layout;
const paginationMetadata: ComponentMetadata = componentMetadataRegistry.pagination;
const radioMetadata: ComponentMetadata = componentMetadataRegistry.radio;
const segmentedControlMetadata: ComponentMetadata = componentMetadataRegistry.segmentedControl;
const textareaMetadata: ComponentMetadata = componentMetadataRegistry.textarea;
const selectMetadata: ComponentMetadata = componentMetadataRegistry.select;
const surfaceMetadata: ComponentMetadata = componentMetadataRegistry.surface;
const switchMetadata: ComponentMetadata = componentMetadataRegistry.switch;
const tabsMetadata: ComponentMetadata = componentMetadataRegistry.tabs;

export type WorkspaceSurfaceProps = SurfaceProps;
export type WorkspaceDropdownProps = DropdownProps;
export type WorkspacePaginationProps = PaginationProps;
export type WorkspacePopoverProps = {
  root: PopoverProps;
  trigger: PopoverTriggerProps;
  content: PopoverContentProps;
  close: PopoverCloseProps;
};

export type WorkspaceLayoutProps = {
  layout: LayoutProps;
  header: LayoutHeaderProps;
  sidebar: LayoutSidebarProps;
  content: LayoutContentProps;
  footer: LayoutFooterProps;
};

export type WorkspaceSelectProps = {
  root: SelectProps;
  trigger: SelectTriggerProps;
  content: SelectContentProps;
  option: SelectOptionProps;
};

export const workspaceSourceResolutionFixture = {
  Breadcrumb,
  Button,
  Checkbox,
  Dropdown,
  Input,
  Layout,
  Pagination,
  Radio,
  SegmentedControl,
  Select,
  Surface,
  Switch,
  Tabs,
  Textarea,
  buttonMetadata,
  breadcrumbMetadata,
  checkboxMetadata,
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
  componentMetadataRegistry,
  dropdownMetadata: componentMetadataRegistry.dropdown,
  compositeAnatomy: {
    PopoverTrigger: Popover.Trigger,
    PopoverContent: Popover.Content,
    PopoverClose: Popover.Close,
    DropdownTrigger: Dropdown.Trigger,
    DropdownContent: Dropdown.Content,
    DropdownItem: Dropdown.Item,
    DropdownSeparator: Dropdown.Separator,
    DropdownButton: Dropdown.Button,
    BreadcrumbItem: Breadcrumb.Item,
    CheckboxGroup: Checkbox.Group,
    LayoutHeader: Layout.Header,
    LayoutSidebar: Layout.Sidebar,
    LayoutContent: Layout.Content,
    LayoutFooter: Layout.Footer,
    RadioGroup: Radio.Group,
    SegmentedControlItem: SegmentedControl.Item,
    SelectTrigger: Select.Trigger,
    SelectContent: Select.Content,
    SelectOption: Select.Option,
    TabsList: Tabs.List,
    TabsTab: Tabs.Tab,
    TabsPanel: Tabs.Panel,
  },
} as const;
