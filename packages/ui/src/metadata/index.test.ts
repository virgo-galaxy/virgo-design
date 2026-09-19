import { describe, expect, it } from 'vitest';

import {
  buttonMetadata,
  checkboxMetadata,
  componentMetadataRegistry,
  inputMetadata,
  radioMetadata,
  segmentedControlMetadata,
  selectMetadata,
  switchMetadata,
  textareaMetadata,
} from './index';

describe('componentMetadataRegistry', () => {
  it('registers the exported Button metadata without creating a copy', () => {
    expect(componentMetadataRegistry.button).toBe(buttonMetadata);
    expect(buttonMetadata.name).toBe('Button');
  });

  it('registers the exported Checkbox metadata without creating a copy', () => {
    expect(componentMetadataRegistry.checkbox).toBe(checkboxMetadata);
    expect(checkboxMetadata.name).toBe('Checkbox');
  });

  it('registers the exported Input metadata without creating a copy', () => {
    expect(componentMetadataRegistry.input).toBe(inputMetadata);
    expect(inputMetadata.name).toBe('Input');
  });

  it('registers the exported Radio metadata without creating a copy', () => {
    expect(componentMetadataRegistry.radio).toBe(radioMetadata);
    expect(radioMetadata.name).toBe('Radio');
  });

  it('registers the exported Select metadata without creating a copy', () => {
    expect(componentMetadataRegistry.select).toBe(selectMetadata);
    expect(selectMetadata.name).toBe('Select');
  });

  it('registers the exported SegmentedControl metadata without creating a copy', () => {
    expect(componentMetadataRegistry.segmentedControl).toBe(segmentedControlMetadata);
    expect(segmentedControlMetadata.name).toBe('SegmentedControl');
  });

  it('registers the exported Switch metadata without creating a copy', () => {
    expect(componentMetadataRegistry.switch).toBe(switchMetadata);
    expect(switchMetadata.name).toBe('Switch');
  });

  it('registers the exported Textarea metadata without creating a copy', () => {
    expect(componentMetadataRegistry.textarea).toBe(textareaMetadata);
    expect(textareaMetadata.name).toBe('Textarea');
  });
});
