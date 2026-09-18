import { describe, expect, it } from 'vitest';

import * as ui from './index';

describe('@virgo-design/ui public API', () => {
  it('exposes runtime UI without metadata', () => {
    expect(ui).toHaveProperty('Button');
    expect(ui).not.toHaveProperty('buttonMetadata');
    expect(ui).not.toHaveProperty('componentMetadataRegistry');
  });
});
