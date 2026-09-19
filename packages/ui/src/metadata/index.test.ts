import { describe, expect, it } from 'vitest';

import {
  buttonMetadata,
  componentMetadataRegistry,
  inputMetadata,
  selectMetadata,
  textareaMetadata,
} from './index';

describe('componentMetadataRegistry', () => {
  it('registers the exported Button metadata without creating a copy', () => {
    expect(componentMetadataRegistry.button).toBe(buttonMetadata);
    expect(buttonMetadata.name).toBe('Button');
  });

  it('registers the exported Input metadata without creating a copy', () => {
    expect(componentMetadataRegistry.input).toBe(inputMetadata);
    expect(inputMetadata.name).toBe('Input');
  });

  it('registers the exported Select metadata without creating a copy', () => {
    expect(componentMetadataRegistry.select).toBe(selectMetadata);
    expect(selectMetadata.name).toBe('Select');
  });

  it('registers the exported Textarea metadata without creating a copy', () => {
    expect(componentMetadataRegistry.textarea).toBe(textareaMetadata);
    expect(textareaMetadata.name).toBe('Textarea');
  });
});
