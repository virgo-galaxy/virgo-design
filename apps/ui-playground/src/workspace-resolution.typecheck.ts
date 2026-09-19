import { Button, Input } from '@virgo-design/ui';
import { type ComponentMetadata, componentMetadataRegistry } from '@virgo-design/ui/metadata';

const buttonMetadata: ComponentMetadata = componentMetadataRegistry.button;
const inputMetadata: ComponentMetadata = componentMetadataRegistry.input;

export const workspaceSourceResolutionFixture = {
  Button,
  Input,
  buttonMetadata,
  inputMetadata,
  componentMetadataRegistry,
} as const;
