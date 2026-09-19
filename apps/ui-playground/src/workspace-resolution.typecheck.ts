import { Button, Checkbox, Input, Select, Textarea } from '@virgo-design/ui';
import { type ComponentMetadata, componentMetadataRegistry } from '@virgo-design/ui/metadata';

const buttonMetadata: ComponentMetadata = componentMetadataRegistry.button;
const checkboxMetadata: ComponentMetadata = componentMetadataRegistry.checkbox;
const inputMetadata: ComponentMetadata = componentMetadataRegistry.input;
const textareaMetadata: ComponentMetadata = componentMetadataRegistry.textarea;
const selectMetadata: ComponentMetadata = componentMetadataRegistry.select;

export const workspaceSourceResolutionFixture = {
  Button,
  Checkbox,
  Input,
  Select,
  Textarea,
  buttonMetadata,
  checkboxMetadata,
  inputMetadata,
  selectMetadata,
  textareaMetadata,
  componentMetadataRegistry,
} as const;
