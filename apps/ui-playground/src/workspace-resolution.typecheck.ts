import { Button, Input, Textarea } from '@virgo-design/ui';
import { type ComponentMetadata, componentMetadataRegistry } from '@virgo-design/ui/metadata';

const buttonMetadata: ComponentMetadata = componentMetadataRegistry.button;
const inputMetadata: ComponentMetadata = componentMetadataRegistry.input;
const textareaMetadata: ComponentMetadata = componentMetadataRegistry.textarea;

export const workspaceSourceResolutionFixture = {
  Button,
  Input,
  Textarea,
  buttonMetadata,
  inputMetadata,
  textareaMetadata,
  componentMetadataRegistry,
} as const;
