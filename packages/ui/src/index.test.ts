import { describe, expect, it } from 'vitest';

import * as ui from './index';

describe('@virgo-design/ui public API', () => {
  it('exposes runtime UI without metadata', () => {
    expect(ui).toHaveProperty('Button');
    expect(ui).toHaveProperty('Checkbox');
    expect(ui).toHaveProperty('CheckboxGroup');
    expect(ui).toHaveProperty('Input');
    expect(ui).toHaveProperty('Radio');
    expect(ui).toHaveProperty('RadioGroup');
    expect(ui).toHaveProperty('SegmentedControl');
    expect(ui).toHaveProperty('SegmentedControlItem');
    expect(ui).toHaveProperty('Textarea');
    expect(ui).toHaveProperty('Select');
    expect(ui).toHaveProperty('Switch');
    expect(ui).not.toHaveProperty('buttonMetadata');
    expect(ui).not.toHaveProperty('checkboxMetadata');
    expect(ui).not.toHaveProperty('inputMetadata');
    expect(ui).not.toHaveProperty('radioMetadata');
    expect(ui).not.toHaveProperty('segmentedControlMetadata');
    expect(ui).not.toHaveProperty('textareaMetadata');
    expect(ui).not.toHaveProperty('selectMetadata');
    expect(ui).not.toHaveProperty('switchMetadata');
    expect(ui).not.toHaveProperty('componentMetadataRegistry');
  });
});
