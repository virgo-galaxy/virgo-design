import { Button } from '@virgo-design/ui';
import { type ComponentMetadata, componentMetadataRegistry } from '@virgo-design/ui/metadata';

const buttonMetadata: ComponentMetadata = componentMetadataRegistry.button;

export const workspaceSourceResolutionFixture = {
  Button,
  buttonMetadata,
  componentMetadataRegistry,
} as const;
