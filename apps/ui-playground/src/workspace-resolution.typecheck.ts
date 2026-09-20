import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  Input,
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
const radioMetadata: ComponentMetadata = componentMetadataRegistry.radio;
const segmentedControlMetadata: ComponentMetadata = componentMetadataRegistry.segmentedControl;
const textareaMetadata: ComponentMetadata = componentMetadataRegistry.textarea;
const selectMetadata: ComponentMetadata = componentMetadataRegistry.select;
const switchMetadata: ComponentMetadata = componentMetadataRegistry.switch;
const tabsMetadata: ComponentMetadata = componentMetadataRegistry.tabs;

export const workspaceSourceResolutionFixture = {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  Input,
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
  radioMetadata,
  segmentedControlMetadata,
  selectMetadata,
  switchMetadata,
  tabsMetadata,
  textareaMetadata,
  componentMetadataRegistry,
} as const;
