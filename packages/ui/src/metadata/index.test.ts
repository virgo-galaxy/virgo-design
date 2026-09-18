import { describe, expect, it } from 'vitest';

import { buttonMetadata, componentMetadataRegistry } from './index';

describe('componentMetadataRegistry', () => {
  it('registers the exported Button metadata without creating a copy', () => {
    expect(componentMetadataRegistry.button).toBe(buttonMetadata);
    expect(buttonMetadata.name).toBe('Button');
    expect(componentMetadataRegistry.button.name).toBe('Button');
  });
});
