import { describe, expect, it } from 'vitest';

import * as ui from './index';

describe('@virgo-design/ui public API', () => {
  it('exposes runtime UI without metadata', () => {
    expect(ui).toHaveProperty('Button');
    expect(ui).toHaveProperty('Input');
    expect(ui).toHaveProperty('Textarea');
    expect(ui).toHaveProperty('Select');
    expect(ui).not.toHaveProperty('buttonMetadata');
    expect(ui).not.toHaveProperty('inputMetadata');
    expect(ui).not.toHaveProperty('textareaMetadata');
    expect(ui).not.toHaveProperty('selectMetadata');
    expect(ui).not.toHaveProperty('componentMetadataRegistry');
  });
});
