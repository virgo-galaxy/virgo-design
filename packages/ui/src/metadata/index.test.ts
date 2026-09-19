import { describe, expect, it } from 'vitest';

import { buttonMetadata, componentMetadataRegistry, inputMetadata } from './index';

describe('componentMetadataRegistry', () => {
  it('registers the exported Button metadata without creating a copy', () => {
    expect(componentMetadataRegistry.button).toBe(buttonMetadata);
    expect(buttonMetadata.name).toBe('Button');
  });

  it('registers the exported Input metadata without creating a copy', () => {
    expect(componentMetadataRegistry.input).toBe(inputMetadata);
    expect(inputMetadata.name).toBe('Input');
  });
});
