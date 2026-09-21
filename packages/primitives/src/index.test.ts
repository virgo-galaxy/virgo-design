import { describe, expect, it } from 'vitest';

import * as primitives from './index';

describe('@virgo-design/primitives public API', () => {
  it('exposes the complete Layout family', () => {
    expect(primitives).toHaveProperty('Layout');
    expect(primitives).toHaveProperty('LayoutHeader');
    expect(primitives).toHaveProperty('LayoutSider');
    expect(primitives).toHaveProperty('LayoutContent');
    expect(primitives).toHaveProperty('LayoutFooter');
    expect(primitives).not.toHaveProperty('Header');
    expect(primitives).not.toHaveProperty('Sider');
    expect(primitives).not.toHaveProperty('Content');
    expect(primitives).not.toHaveProperty('Footer');
  });
});
