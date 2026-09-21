import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  Input,
  Layout,
  LayoutContent,
  type LayoutContentProps,
  LayoutFooter,
  type LayoutFooterProps,
  LayoutHeader,
  type LayoutHeaderProps,
  type LayoutProps,
  LayoutSider,
  type LayoutSiderProps,
  Radio,
  RadioGroup,
  SegmentedControl,
  SegmentedControlItem,
  Select,
  Switch,
  Tab,
  TabList,
  TabPanel,
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
const switchMetadata: ComponentMetadata = componentMetadataRegistry.switch;
const tabsMetadata: ComponentMetadata = componentMetadataRegistry.tabs;

export type WorkspaceLayoutProps = {
  layout: LayoutProps;
  header: LayoutHeaderProps;
  sider: LayoutSiderProps;
  content: LayoutContentProps;
  footer: LayoutFooterProps;
};

export const workspaceSourceResolutionFixture = {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  Input,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
  Radio,
  RadioGroup,
  SegmentedControl,
  SegmentedControlItem,
  Select,
  Switch,
  Tab,
  TabList,
  TabPanel,
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
  switchMetadata,
  tabsMetadata,
  textareaMetadata,
  componentMetadataRegistry,
} as const;
