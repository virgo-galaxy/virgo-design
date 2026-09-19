import {
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  SegmentedControl,
  SegmentedControlItem,
  Select,
  Switch,
  Textarea,
} from '@virgo-design/ui';
import { type ComponentMetadata, componentMetadataRegistry } from '@virgo-design/ui/metadata';

const buttonMetadata: ComponentMetadata = componentMetadataRegistry.button;
const checkboxMetadata: ComponentMetadata = componentMetadataRegistry.checkbox;
const inputMetadata: ComponentMetadata = componentMetadataRegistry.input;
const radioMetadata: ComponentMetadata = componentMetadataRegistry.radio;
const segmentedControlMetadata: ComponentMetadata = componentMetadataRegistry.segmentedControl;
const textareaMetadata: ComponentMetadata = componentMetadataRegistry.textarea;
const selectMetadata: ComponentMetadata = componentMetadataRegistry.select;
const switchMetadata: ComponentMetadata = componentMetadataRegistry.switch;

export const workspaceSourceResolutionFixture = {
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  SegmentedControl,
  SegmentedControlItem,
  Select,
  Switch,
  Textarea,
  buttonMetadata,
  checkboxMetadata,
  inputMetadata,
  radioMetadata,
  segmentedControlMetadata,
  selectMetadata,
  switchMetadata,
  textareaMetadata,
  componentMetadataRegistry,
} as const;
