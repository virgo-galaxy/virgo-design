import {
  Breadcrumb,
  Button,
  Checkbox,
  Input,
  Layout,
  type LayoutContentProps,
  type LayoutFooterProps,
  type LayoutHeaderProps,
  type LayoutProps,
  type LayoutSiderProps,
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
const radioMetadata: ComponentMetadata = componentMetadataRegistry.radio;
const segmentedControlMetadata: ComponentMetadata = componentMetadataRegistry.segmentedControl;
const textareaMetadata: ComponentMetadata = componentMetadataRegistry.textarea;
const selectMetadata: ComponentMetadata = componentMetadataRegistry.select;
const surfaceMetadata: ComponentMetadata = componentMetadataRegistry.surface;
const switchMetadata: ComponentMetadata = componentMetadataRegistry.switch;
const tabsMetadata: ComponentMetadata = componentMetadataRegistry.tabs;

export type WorkspaceSurfaceProps = SurfaceProps;

export type WorkspaceLayoutProps = {
  layout: LayoutProps;
  header: LayoutHeaderProps;
  sider: LayoutSiderProps;
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
  Input,
  Layout,
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
  radioMetadata,
  segmentedControlMetadata,
  selectMetadata,
  surfaceMetadata,
  switchMetadata,
  tabsMetadata,
  textareaMetadata,
  componentMetadataRegistry,
  compositeAnatomy: {
    BreadcrumbItem: Breadcrumb.Item,
    CheckboxGroup: Checkbox.Group,
    LayoutHeader: Layout.Header,
    LayoutSider: Layout.Sider,
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
